import { StatusCodes } from "http-status-codes";
import { db } from "src";
import { AppError } from "src/shared/app-error";

export const getReceptionistById = async (id: string) => {
      try {
            const receptionist = await db.receptionist.findFirst({
                  where: {
                        userId: Number(id),
                  },
            });

            if (!receptionist) {
                  throw new AppError(StatusCodes.NOT_FOUND, "Receptionist was not found");
            }

            return receptionist;
      } catch (error) {
            console.error(error);
            throw new AppError(StatusCodes.BAD_REQUEST, "Invalid ID");
      }
};
