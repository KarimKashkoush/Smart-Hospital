import { Gender } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { db } from "src";
import { AppError } from "src/shared/app-error";

type updateReceptionist = {
  username?: string;
  email?: string;
  passwordHash?: string;
  gender?: string;
  phone?: string;
  name?: string;
};

export const updateReceptionist = async (
  id: string,
  data: updateReceptionist,
  image?: Express.Multer.File,
) => {
  const findReceptionist = await db.receptionist.findFirst({
    where: {
      userId: +id,
    },
  });
  if (!findReceptionist) {
    throw new AppError(StatusCodes.NOT_FOUND, "Receptionist was not found");
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const receptionist = await db.user.update({
    where: {
      id: +id,
    },
    data: {
      ...(data.username ? { username: data.username } : {}),
      ...(data.passwordHash ? { passwordHash: data.passwordHash } : {}),
      ...(image ? { image: image.filename } : {}),
    },
  });
  const updateReceptionist = await db.receptionist.update({
    where: {
      userId: +id,
    },
    data: {
      ...(data.email ? { email: data.email } : {}),
      ...(data.gender ? { gender: data.gender as Gender } : {}),
      ...(data.phone ? { phone: data.phone } : {}),
      ...(data.name ? { name: data.name } : {}),
    },
  });
  return { updateReceptionist };
};
