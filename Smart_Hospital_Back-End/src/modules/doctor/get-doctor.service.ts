import { StatusCodes } from "http-status-codes";
import { db } from "src";
import { AppError } from "src/shared/app-error";

export const getDoctors = async () => {
  try {
    const doctors = await db.doctor.findMany();
    return doctors;
  } catch {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid ID");
  }
};

export const getDoctorDetails = async (id: string) => {
  try {
    const doctor = await db.doctor.findFirst({
      where: {
        userId: Number(id),
      },
      include: {
        medicalExcuse: true, // دي السطر اللي بيجيب كل الأعذار الطبية الخاصة بالدكتور
      },
    });

    if (!doctor) {
      throw new AppError(StatusCodes.NOT_FOUND, "Doctor was not found");
    }

    const timeSlots = await db.timeSlots.findMany({
      where: {
        doctorId: doctor.userId,
      },
      include: {
        bookings: true,
      },
    });

    const bookings = timeSlots.map((slot) => {
      const booked = slot.bookings.map((booking) => ({
        date: booking.date,
        hour: slot.hour,
      }));

      return {
        id: slot.id,
        hour: slot.hour,
        shift: slot.shift,
        booked,
      };
    });

    return { ...doctor, timeSlots: bookings };
  } catch {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid ID");
  }
};

