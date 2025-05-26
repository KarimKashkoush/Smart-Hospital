import { StatusCodes } from "http-status-codes";
import { db } from "src";
import { AppError } from "src/shared/app-error";

export const getDoctorBookings = async (id: string) => {
  try {
    const timeSlots = await db.timeSlots.findMany({
      where: {
        doctorId: +id,
      },
      include: {
        bookings: {
          include: {
            patient: true, 
          }
        },
      },
    });

    const timeSlotsBookings = timeSlots.map((timeSlot) => {
      return timeSlot.bookings.map((booking) => ({
        id: booking.id,
        date: booking.date,
        patientId: booking.patientId,
        patientName: booking.patient?.name,
        status: booking.status,
      }));
    });

    const bookings = timeSlotsBookings.flat();

    return bookings;
  } catch {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid ID");
  }
};
