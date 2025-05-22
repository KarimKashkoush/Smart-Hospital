import { StatusCodes } from "http-status-codes";
import { db } from "src";
import { AppError } from "src/shared/app-error";
import { logger } from "src/shared/logger";
import { getDoctorBookings } from "./get-booking.service";
import { getDay } from "date-fns";
import { weekDaysArray } from "src/shared/constants/week-days";

export async function rescheduleBooking(
  bookingId: number,
  newTimeSlotId: number,
  date: string,
) {
  const oldBooking = await db.booking.findUnique({
    where: { id: +bookingId },
    include: {
      timeSlot: { include: { doctor: true } },
    },
  });

  const day = getDay(date);

  const doctorWorkDays = oldBooking.timeSlot.doctor.week;

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
    const isBooked =
      (await db.booking.count({
        where: { timeSlotId: newTimeSlotId, date },
      })) > 0;

    if (isBooked) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "This date is already booked in the specified time slot",
      );
    }

    const record = await db.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        date,
        patient: {
          connect: {
            userId: oldBooking.patientId,
          },
        },
        timeSlot: {
          connect: {
            id: newTimeSlotId,
          },
        },
      },
      include: {
        timeSlot: {
          include: {
            doctor: true,
          },
        },
      },
    });

    const doctorBookings = await getDoctorBookings(
      String(record.timeSlot.doctorId),
    );

    const booking = { ...record };

    delete booking.timeSlot;

    return { doctorBookings, booking };
  } catch (err) {
    logger.error(err);
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid time slot ID");
  }
}
