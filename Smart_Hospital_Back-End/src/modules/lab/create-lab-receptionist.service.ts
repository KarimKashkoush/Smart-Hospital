import { hashSync } from "bcryptjs";
import { db } from "src";
import { AppError } from "src/shared/app-error";
import { z } from "zod";
import { createLabReceptionistSchema } from "./lab.validation";
import { Role } from "@prisma/client";

export const createLabReceptionist = async ({
  username,
  name,
  password,
  phone,
  email,
  gender,
  birthDate,
  supervisorDoctorId,
}: z.infer<typeof createLabReceptionistSchema>) => {
  // التحقق من supervisor
  const checkSupervisorExists =
    (await db.doctor.count({
      where: { userId: Number(supervisorDoctorId) },
    })) > 0;

  if (!checkSupervisorExists) {
    throw new AppError(400, "Invalid Supervisor ID");
  }

  const labReceptionist = await db.user.create({
    data: {
      username,
      passwordHash: hashSync(password, 10),
      role: Role.lab,
      labReceptionist: {
        create: {
          name,
          email,
          phone,
          gender,
          birthDate, // هنا string زي في الموديل
          supervisorId: Number(supervisorDoctorId),
        },
      },
    },
    include: {
      labReceptionist: true,
    },
  });


  return {
    ...labReceptionist.labReceptionist,
    username: labReceptionist.username,
    avatar: labReceptionist.image,
  };
};

