import { getDay } from "date-fns";
import { StatusCodes } from "http-status-codes";
import { db } from "src";
import { AppError } from "src/shared/app-error";
import { weekDaysArray } from "src/shared/constants/week-days";

type CreateBookingData = {
  timeSlotId: number;
  patientId?: number;
  date?: Date;
  patientName?: string;
};

export const createBooking = async (data: CreateBookingData) => {
  const { timeSlotId, patientId, date } = data;

  const timeSlot = await db.timeSlots.findUnique({
    where: { id: 1 },
    include: {
      doctor: true,
    },
  });

  if (!timeSlot) {
    throw new Error("TimeSlot not found");
  }
  if (!timeSlot.doctor) {
    throw new Error("Doctor not found in this timeSlot");
  }


  const day = getDay(date);


  if (!timeSlot?.doctor) {
    throw new Error("Doctor data not found in timeSlot. Make sure it's populated.");
  }

  const doctorWorkDays = timeSlot.doctor.week;


  const isDoctorAvailable = doctorWorkDays

    .map((week) => week.toString())
    .includes(weekDaysArray[day]);

  if (!isDoctorAvailable) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Doctor is not availabe in that day",
    );
  }

  try {
    const findTime = await db.timeSlots.findFirst({
      where: {
        id: timeSlotId,
      },
      include: {
        bookings: true,
      },
    });

    console.log("Request body:", data);

    if (!findTime) {
      throw new AppError(StatusCodes.NOT_FOUND, "Time slot was not found");
    }

    if (patientId) {
      const patientExists = await db.patient.findUnique({
        where: { userId: patientId },
      });

      if (!patientExists) {
        throw new AppError(StatusCodes.NOT_FOUND, "Patient was not found");
      }
    }
    const existBooking = await db.booking.findFirst({
      where: {
        timeSlotId: timeSlotId,
        date: date,
      },
    });

    if (existBooking) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Time slot is already booked for this date",
      );
    }



    const booking = await db.booking.create({
      data: {
        date: date,
        timeSlot: { connect: { id: timeSlotId } },
        ...(patientId ? { patient: { connect: { userId: patientId } } } : {}),
        patientName: data.patientName,
        status: "confirmed",
      },
    });




    return booking;
  } catch (err) {
    console.error("Unexpected Error:", err);
    if (err instanceof AppError) {
      throw err;
    }
    throw new AppError(StatusCodes.BAD_REQUEST, `Unexpected Error: ${err.message}`);

  }
};
