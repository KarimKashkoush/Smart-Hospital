import { hashSync } from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { db } from "src";
import { AppError } from "src/shared/app-error";
import { z } from "zod";
import { createReceptionistSchema } from "./receptionist.validation";
import { Role } from "@prisma/client";

export const createReceptionist = async (
  {
    username,
    name,
    password,
    phone,
    email,
    department,
    gender,
  }: z.infer<typeof createReceptionistSchema>,
  image?: Express.Multer.File,
) => {
  const exist = await db.user.findUnique({
    where: {
      username: username,
    },
  });

  if (exist) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Receptionist already exists");
  }
  const imagePath = image ? "/" + image.filename : null;

  const receptionist = await db.user.create({
    data: {
      username: username,
      passwordHash: hashSync(password, 10),
      image: imagePath,
      role: Role.receptionist,
      receptionist: {
        create: {
          name: name,
          gender: gender,
          email: email,
          phone: phone,
          department: department,
        },
      },
    },
  });
  return {
    ...receptionist,
    username: receptionist.username,
    avatar: receptionist.image,
  };
};
