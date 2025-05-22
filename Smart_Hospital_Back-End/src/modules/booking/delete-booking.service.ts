import { Booking } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { db } from "src";
import { AppError } from "src/shared/app-error";

export const deleteBooking = async (id: string): Promise<Booking> => {
  const findBooking = await db.booking.findFirst({
    where: {
      id: +id,
    },
  });
  if (!findBooking) {
    throw new AppError(StatusCodes.NOT_FOUND, "Booking not found");
  }
  const deletedBooking = await db.booking.delete({
    where: {
      id: +id,
    },
  });
  return deletedBooking;
};
