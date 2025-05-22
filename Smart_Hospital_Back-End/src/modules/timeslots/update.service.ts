import { StatusCodes } from "http-status-codes";
import { db } from "src";
import { AppError } from "src/shared/app-error";

type updateTimeSlotsData = {
  doctorId: number;
  shift: "Morning" | "Evening";
  hour: Date;
};

export const updateTimeSlot = async (id: string, data: updateTimeSlotsData) => {
  try {
    const findTime = await db.timeSlots.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!findTime) {
      throw new AppError(StatusCodes.NOT_FOUND, "Time slot not found");
    }
    const updatedTime = await db.timeSlots.update({
      where: {
        id: Number(id),
      },
      data: {
        ...(data.doctorId ? { doctorId: data.doctorId } : {}),
        ...(data.shift ? { shift: data.shift } : {}),
        ...(data.hour ? { hour: data.hour } : {}),
      },
    });
    return { message: "Successful", updatedTime };
  } catch {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid ID");
  }
};
