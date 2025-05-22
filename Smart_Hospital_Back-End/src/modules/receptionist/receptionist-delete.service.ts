import { StatusCodes } from "http-status-codes";
import { db } from "src";
import { AppError } from "src/shared/app-error";

export async function deleteReceptionist(id: string) {
  try {
    const findReceptionist = await db.receptionist.findFirst({
      where: {
        userId: +id,
      },
    });

    if (!findReceptionist) {
      throw new AppError(StatusCodes.NOT_FOUND, "Receptionist was not found");
    }

    const receptionist = await db.receptionist.delete({
      where: { userId: +id },
    });
    return receptionist;
  } catch {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid ID");
  }
}
