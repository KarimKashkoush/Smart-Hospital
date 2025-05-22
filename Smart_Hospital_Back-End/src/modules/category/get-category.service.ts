import { StatusCodes } from "http-status-codes";
import { db } from "src";
import { AppError } from "src/shared/app-error";

export const getCategories = async () => {
  try {
    const categories = await db.category.findMany({
      include: {
        doctor: {
          select: {
            userId: true,
            name: true,
            email: true,
            phone: true,
            specializationShort: true,
            specializationLong: true,
            yearsofExperience: true,
            awards: true,
          },
        },
      },
    });
    return categories;
  } catch {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Unknown error; check the server logs"
    );
  }
};
