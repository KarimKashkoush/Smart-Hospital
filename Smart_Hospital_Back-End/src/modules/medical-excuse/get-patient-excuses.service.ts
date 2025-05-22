import { StatusCodes } from "http-status-codes";
import { db } from "src";
import { AppError } from "src/shared/app-error";

export async function getPatientMedicalExcuses(patientId: number) {
  if (isNaN(patientId)) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid patient ID");
  }

  const checkPatientExists =
    (await db.patient.count({ where: { userId: patientId } })) > 0;

  if (!checkPatientExists) {
    throw new AppError(StatusCodes.NOT_FOUND, "Invalid patient ID");
  }

  return await db.medicalExcuse.findMany({ where: { patientId } });
}
