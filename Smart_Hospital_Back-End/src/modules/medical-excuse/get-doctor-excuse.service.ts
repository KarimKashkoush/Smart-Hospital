import { StatusCodes } from "http-status-codes";
import { db } from "src";
import { AppError } from "src/shared/app-error";

export async function getDoctorMedicalExcuses(doctorId: number) {
  if (isNaN(doctorId)) {
    throw new AppError(StatusCodes.BAD_GATEWAY, "Invalid doctor ID");
  }

  const checkDoctorExists =
    (await db.doctor.count({ where: { userId: doctorId } })) > 0;

  if (!checkDoctorExists) {
    throw new AppError(StatusCodes.NOT_FOUND, "Invalid doctor ID");
  }

  return await db.medicalExcuse.findMany({ where: { doctorId } });
}
