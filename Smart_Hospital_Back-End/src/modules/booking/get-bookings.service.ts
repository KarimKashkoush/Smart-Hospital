import { StatusCodes } from "http-status-codes";
import { db } from "src";
import { AppError } from "src/shared/app-error";

export const getBookings = async () => {
  try {
    const bookedSlots = await db.timeSlots.findMany({
      where: {
        bookings: {
          some: {}, // معناها فيه حجوزات مرتبطة بالـ slot ده
        },
      },
      include: {
        bookings: {
          include: {
            patient: true, // لو محتاج بيانات المريض
          },
        },
        doctor: true, // لو محتاج بيانات الدكتور
      },
    });

    return bookedSlots;
  } catch {
    throw new AppError(StatusCodes.BAD_REQUEST, "Something went wrong");
  }
};
