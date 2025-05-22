import { z } from "zod";
import { createLabTestSchema } from "./lab.validation";
import { Express } from "express";
import { db } from "src";
import { AppError } from "src/shared/app-error";
import { StatusCodes } from "http-status-codes";

export async function createLabTest({
  date,
  attachment,
  name,
  status,
  referringDoctorId,
  patientUsername,
}: z.infer<typeof createLabTestSchema> & {
  attachment?: Express.Multer.File;
}) {
  const attachmentPath = attachment ? "/" + attachment.filename : undefined;

  const checkDoctorExists =
    (await db.doctor.count({ where: { userId: referringDoctorId } })) > 0;

  if (!checkDoctorExists) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "The referring doctor ID is invalid",
    );
  }

  const user = await db.user.findUnique({
    where: { username: patientUsername },
    include: {
      patient: true,
    },
  });

  if (!user?.patient) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid patient username");
  }

  const labTest = await db.labTest.create({
    data: {
      name,
      status: status ?? "pending",
      date,
      ...(attachment ? { attachment: attachmentPath } : { attachment: "" }),
      referringDoctor: {
        connect: {
          userId: referringDoctorId,
        },
      },
      patient: {
        connect: {
          userId: user.id,
        },
      },
    },
  });

  return labTest;
}
