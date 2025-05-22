import { Category } from "@prisma/client";
import { db } from "src";
import { unlink } from "fs/promises";
import { AppError } from "src/shared/app-error";
import { StatusCodes } from "http-status-codes";
export const deleteCategory = async ({
  id,
}: {
  id: string;
}): Promise<Category> => {
  try {
    const category = await db.category.delete({
      where: {
        id: Number(id),
      },
    });
    await unlink("uploads" + category.image);
    return category;
  } catch {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid ID");
  }
};
