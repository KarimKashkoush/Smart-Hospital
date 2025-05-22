import { StatusCodes } from "http-status-codes";
import { db } from "src";
import { AppError } from "src/shared/app-error";

export const deleteTimeSlot = async (id: string) => {
  try {
    const findTime = await db.timeSlots.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!findTime) {
      throw new AppError(StatusCodes.NOT_FOUND, "Time slot not found");
    }
    const deletedTime = await db.timeSlots.delete({
      where: {
        id: Number(id),
      },
    });
    return { message: "Successful", deletedTime };
  } catch {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid ID");
  }
};
