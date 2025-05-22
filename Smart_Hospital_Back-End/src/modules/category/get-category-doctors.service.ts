import { Doctor } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { db } from "src";
import { AppError } from "src/shared/app-error";

export async function getCategoryDoctors(id: string): Promise<Doctor[]> {
  try {
    const doctors = await db.doctor.findMany({
      where: {
        categoryId: +id,
      },
    });

    return doctors;
  } catch {
    throw new AppError(StatusCodes.BAD_REQUEST, "Ensure the ID is valid");
  }
}
