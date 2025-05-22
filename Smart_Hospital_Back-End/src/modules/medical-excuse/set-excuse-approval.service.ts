import { ExcuseStatus } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { db } from "src";
import { AppError } from "src/shared/app-error";

export async function setMedicalExcuseApproval(
  medicalExcuseId: number,
  status: "approved" | "rejected",
) {
  const checkMedicalExcuseExists =
    (await db.medicalExcuse.count({ where: { id: medicalExcuseId } })) > 0;

  if (!checkMedicalExcuseExists) {
    throw new AppError(StatusCodes.NOT_FOUND, "Invalid medical excuse ID");
  }

  const medicalExcuse = await db.medicalExcuse.update({
    where: { id: medicalExcuseId },
    data: {
      status:
        status === "approved"
          ? ExcuseStatus.approved
          : status === "rejected"
            ? ExcuseStatus.rejected
            : ExcuseStatus.pending,
    },
  });

  return medicalExcuse;
}
