import { StatusCodes } from "http-status-codes";
import { db } from "src";
import { AppError } from "src/shared/app-error";

type updateTimeSlotsData = {
  doctorId?: number;
  shift?: "Morning" | "Evening";
  dayOfWeek?: "Saturday" | "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
  startTime?: string;
  endTime?: string;
};

export const updateTimeSlot = async (id: string, data: updateTimeSlotsData) => {
  try {
    const findTime = await db.timeSlots.findUnique({
      where: { id: Number(id) },
    });

    if (!findTime) {
      throw new AppError(StatusCodes.NOT_FOUND, "Time slot not found");
    }

    const updatedTime = await db.timeSlots.update({
      where: { id: Number(id) },
      data: {
        ...(data.doctorId !== undefined ? { doctor: { connect: { userId: data.doctorId } } } : {}),
        ...(data.shift !== undefined ? { shift: data.shift } : {}),
        ...(data.dayOfWeek !== undefined ? { dayOfWeek: data.dayOfWeek } : {}),
        ...(data.startTime !== undefined ? { startTime: data.startTime } : {}),
        ...(data.endTime !== undefined ? { endTime: data.endTime } : {}),
      },
    });

    return { message: "Successful", updatedTime };
  } catch {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid ID or update failed");
  }
};
