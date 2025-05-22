import { z } from "zod";
import { updateMedicalExcuseSchema } from "./excuse.validation";
import { db } from "src";

export async function updateMedicalExcuse(
  medicalExcuseId: number,
  {
    doctorId,
    patientId,
    reason,
    endDate,
    startDate,
    attachment,
    status,
    rejectionReason,  // ضيفه هنا
  }: z.infer<typeof updateMedicalExcuseSchema> & {
    attachment?: Express.Multer.File;
    status?: string;
    rejectionReason?: string;
  },
) {
  const attachmentFile = attachment ? "/" + attachment.filename : undefined;

  const updatedRecord = await db.medicalExcuse.update({
    data: {
      ...(doctorId ? { doctor: { connect: { userId: doctorId } } } : {}),
      ...(patientId ? { patient: { connect: { userId: patientId } } } : {}),
      ...(reason ? { reason } : {}),
      ...(startDate ? { startDate } : {}),
      ...(endDate ? { endDate } : {}),
      ...(attachmentFile ? { image: attachmentFile } : {}),
      ...(status ? { status } : {}),
      ...(rejectionReason ? { rejectionReason } : {}),
    },
    where: { id: medicalExcuseId },
  });

  return updatedRecord;
}
