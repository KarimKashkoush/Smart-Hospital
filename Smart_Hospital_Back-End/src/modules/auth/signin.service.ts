import { compareSync } from "bcrypt";
import { db } from "src";
import { SignJWT } from "jose";
import { env } from "src/env";
import zod from "zod";
import { signInSchema } from "./auth.validation";
import { AppError } from "src/shared/app-error";
import { StatusCodes } from "http-status-codes";

type SignInData = zod.infer<typeof signInSchema>;

export const signIn = async ({
  username,
  password,
}: SignInData): Promise<{
  token: string;
  user: Record<string, unknown>;
}> => {
  const user = await db.user.findFirst({
    where: {
      username: username,
    },
  });
  if (!user) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "username or password is incorrect",
    );
  }
  if (!compareSync(password, user.passwordHash)) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "username or password is incorrect",
    );
  }
  const secret = new TextEncoder().encode(env.JWT_SECRET);
  const token = await new SignJWT({ id: user.id, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(secret);

  const isAdmin = user.role === "admin";
  const isReceptionist = user.role === "receptionist";
  const isLabReceptionist = user.role === "lab";
  const isDoctor = user.role === "doctor";
  const isPatient = user.role === "patient";

  let userRecord: Record<string, unknown> = {};

  if (isAdmin || isReceptionist) {
    const receptionist = await db.receptionist.findUnique({
      where: { userId: user.id },
    });

    userRecord = receptionist;
  } else if (isLabReceptionist) {
    const labReceptionist = await db.labReceptionist.findUnique({
      where: { userId: user.id },
    });

    userRecord = labReceptionist;
  } else if (isDoctor) {
    const doctor = await db.doctor.findUnique({
      where: { userId: user.id },
    });

    userRecord = doctor;
  } else if (isPatient) {
    const patient = await db.patient.findUnique({
      where: { userId: user.id },
    });

    userRecord = patient;
  }

  userRecord.username = user.username;
  userRecord.avatar = user.image;
  userRecord.role = user.role;

  return { token, user: userRecord };
};
