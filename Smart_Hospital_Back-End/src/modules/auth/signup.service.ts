import { hashSync } from "bcrypt";
import { db } from "src";
import jwt from "jsonwebtoken";
import { env } from "src/env";
import zod from "zod";
import { signUpSchema } from "./auth.validation";
import { AppError } from "src/shared/app-error";
import { StatusCodes } from "http-status-codes";
import { Patient } from "@prisma/client";

type SignUpData = zod.infer<typeof signUpSchema>;

export const signUp = async ({
  password,
  username,
  gender,
  phone,
  birthDate,
  email,
  name,
  emergencyContactName,
  emergencyContactNumber,
  emergencyContactRelationship,
  medicalHistory = [],
  additionalNotes = "",
  university,
}: SignUpData): Promise<{
  token: string;
  user: Patient & { username: string; avatar: string };
}> => {
  const user = await db.user.findUnique({
    where: {
      username: username,
    },
  });

  if (user) {
    throw new AppError(StatusCodes.BAD_REQUEST, "username is already in use");
  }

  const historyArray = Array.isArray(medicalHistory)
    ? medicalHistory
    : [medicalHistory];

  const createUser = await db.user.create({
    data: {
      username: username,
      passwordHash: hashSync(password, 10),
      patient: {
        create: {
          email: email,
          name: name,
          gender: gender,
          phone: phone,
          birthDate: birthDate,
          emergencyContactName: emergencyContactName,
          emergencyContactNumber: emergencyContactNumber,
          emergencyContactRelationship: emergencyContactRelationship,
          medicalHistory: historyArray,
          additionalNotes: additionalNotes,
          university: university,
        },
      },
    },
    include: {
      patient: true,
    },
  });

  const token = jwt.sign(
    {
      id: createUser.id,
      username: createUser.username,
      role: createUser.role,
    },
    env.JWT_SECRET,
  );

  return {
    token,
    user: {
      ...createUser.patient,
      username: createUser.username,
      avatar: createUser.image,
    },
  };
};
