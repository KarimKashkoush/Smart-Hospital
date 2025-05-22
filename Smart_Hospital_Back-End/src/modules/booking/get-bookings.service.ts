import { StatusCodes } from "http-status-codes";
import { db } from "src";
import { AppError } from "src/shared/app-error";

export const getBookings = async () => {
  try {
    const bookings = await db.timeSlots.findMany();
    return bookings;
  } catch {
    throw new AppError(StatusCodes.BAD_REQUEST, "Something went wrong");
  }
};
