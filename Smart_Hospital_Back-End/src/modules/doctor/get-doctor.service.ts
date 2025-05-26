import { StatusCodes } from "http-status-codes";
import { db } from "src";
import { AppError } from "src/shared/app-error";

export const getDoctors = async () => {
  try {
    const doctors = await db.doctor.findMany({
      include: {
        timeSlots: {
          include: {
            bookings: true, // لو عايز تجيب الحجوزات لكل وقت
          },
        },
      },
    });

    // ممكن تبني شكل المواعيد زي getDoctorDetails
    const doctorsWithSlots = doctors.map((doctor) => {
      const timeSlots = doctor.timeSlots.map((slot) => {
        const booked = slot.bookings.map((booking) => ({
          date: booking.date,
          dayOfWeek: slot.dayOfWeek,
        }));

        return {
          id: slot.id,
          dayOfWeek: slot.dayOfWeek,
          shift: slot.shift,
          startTime: slot.startTime,
          endTime: slot.endTime,
          booked,
        };
      });

      return {
        ...doctor,
        timeSlots,
      };
    });

    return doctorsWithSlots;
  } catch {
    throw new AppError(StatusCodes.BAD_REQUEST, "Failed to fetch doctors");
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
        dayOfWeek: slot.dayOfWeek,
      }));

      return {
        id: slot.id,
        dayOfWeek: slot.dayOfWeek,
        shift: slot.shift,
        startTime: slot.startTime,
        endTime: slot.endTime,
        booked,
      };
    });

    return { ...doctor, timeSlots: bookings };
  } catch {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid ID");
  }
};

