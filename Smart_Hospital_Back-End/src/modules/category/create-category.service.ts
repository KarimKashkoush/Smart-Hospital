import { StatusCodes } from "http-status-codes";
import { db } from "src";
import { AppError } from "src/shared/app-error";

export const createCategory = async ({
  name,
  image,
  description,
  link,
}: {
  name: string;
  image: Express.Multer.File;
  description: string;
  link: string;
}) => {
  const exist = await db.category.findUnique({
    where: { name },
  });

  if (exist) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Category already exists");
  }

  const imagePath = "/" + image.filename;

  const category = await db.category.create({
    data: {
      name,
      image: imagePath,
      description,
      link,
    },
  });

  return category;
};

