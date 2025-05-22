import { Doctor } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { db } from "src";
import { AppError } from "src/shared/app-error";

export const deleteDoctor = async (id: string): Promise<Doctor> => {
  try {
    const doctor = await db.user.findFirst({
      where: {
        id: +id,
      },
    });

    if (!doctor) {
      throw new AppError(StatusCodes.NOT_FOUND, "Doctor was not found");
    }

    await db.timeSlots.deleteMany({
      where: {
        doctorId: doctor.id,
      },
    });

    const user = await db.user.delete({
      where: {
        id: +id,
      },
      include: {
        doctor: true,
      },
    });

    return user.doctor;
  } catch (error) {
    console.error("Delete error:", error);
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid ID");
  }
};
