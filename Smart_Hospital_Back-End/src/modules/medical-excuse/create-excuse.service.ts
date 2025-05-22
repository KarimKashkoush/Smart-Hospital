import { z } from "zod";
import { createMedicalExcuseSchema } from "./excuse.validation";
import { Express } from "express";
import { db } from "src";
import { AppError } from "src/shared/app-error";
import { StatusCodes } from "http-status-codes";

export async function createMedicalExcuse({
  reason,
  endDate,
  doctorId,
  startDate,
  attachment,
  patientId,
  fullName,
  email,
  categoryId,
}: z.infer<typeof createMedicalExcuseSchema> & {
  attachment: Express.Multer.File;
  fullName: string;
  email: string;
  categoryId?: number;
}) {
  const attachmentFile = "/" + attachment?.filename;

  const doctorIdNum = Number(doctorId);
  const patientIdNum = Number(patientId);

  const doctor = (await db.doctor.count({ where: { userId: doctorIdNum } })) > 0;

  if (!doctor) {
    throw new AppError(StatusCodes.NOT_FOUND, "Invalid doctor ID");
  }

  const patient = (await db.patient.count({ where: { userId: patientIdNum } })) > 0;

  if (!patient) {
    throw new AppError(StatusCodes.NOT_FOUND, "Invalid patient ID");
  }

  const medicalExcuse = await db.medicalExcuse.create({
    data: {
      patient: { connect: { userId: patientIdNum } },
      doctor: { connect: { userId: doctorIdNum } },
      category: { connect: { id: Number(categoryId) } },
      reason,
      endDate,
      startDate,
      fullName,
      email,
      status: "Pending",
      rejectionReason: "",   // هنا بضيفها بقيمة فارغة
      ...(attachment ? { image: attachmentFile } : {}),
    },
  });


  return medicalExcuse;
}

