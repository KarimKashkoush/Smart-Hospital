import { Category } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { db } from "src";
import { AppError } from "src/shared/app-error";
import { unlink } from "fs/promises";

export const updateOneCategory = async ({
  name,
  image,
  id,
}: {
  name: string;
  image: Express.Multer.File;
  id: string;
}): Promise<Category> => {
  if (!image && !name) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "You need to specify at least one of the following data: `name`, `image`",
    );
  }

  try {
    const category = await db.category.findUnique({
      where: { id: Number(id) },
    });

    const imagePath = "/" + image.filename;
    const newCategory = await db.category.update({
      where: {
        id: Number(id),
      },
      data: {
        ...(name ? { name } : {}),
        ...(image ? { image: imagePath } : {}),
      },
    });

    await unlink("uploads" + category.image);

    return newCategory;
  } catch {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid ID");
  }
};
