import { StatusCodes } from "http-status-codes";
import { db } from "src";
import { AppError } from "src/shared/app-error";

export const getAllTimeSlots = async () => {
  try {
    const timeslots = await db.timeSlots.findMany();
    return timeslots;
  } catch {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid ID");
  }
};
export const getOneTimeSlot = async (id: string) => {
  try {
    const timeSlot = await db.timeSlots.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        doctor: true,
      },
    });

    if (!timeSlot) {
      throw new AppError(StatusCodes.NOT_FOUND, "Time slot not found");
    }

    return timeSlot;
  } catch {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid ID");
  }
};
