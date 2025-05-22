import { StatusCodes } from "http-status-codes";
import { db } from "src";
import { AppError } from "src/shared/app-error";

export async function deleteMedicalExcuse(medicalExcuseId: number) {
  const checkMedicalExcuseExists =
    (await db.medicalExcuse.count({ where: { id: medicalExcuseId } })) > 0;

  if (!checkMedicalExcuseExists) {
    throw new AppError(StatusCodes.NOT_FOUND, "Invalid medical excuse ID");
  }

  const deletedRecord = await db.medicalExcuse.delete({
    where: { id: medicalExcuseId },
  });

  return deletedRecord;
}
