import { db } from "src";
import { createMedicalRecordSchema } from "./medical-record.validation";
import { AppError } from "src/shared/app-error";
import { z } from "zod";

type MedicalRecordData = z.infer<typeof createMedicalRecordSchema>;

export const createMedicalRecord = async (data: MedicalRecordData) => {
      // Validate data
      const validatedData = createMedicalRecordSchema.parse(data);

      // ممكن تتأكد إن المريض والدكتور موجودين (اختياري)
      const patientExists = await db.patient.findUnique({
            where: { userId: validatedData.patientId },
      });
      if (!patientExists) throw new AppError(404, "Patient not found");

      const doctorExists = await db.doctor.findUnique({
            where: { userId: validatedData.doctorId },
      });
      if (!doctorExists) throw new AppError(404, "Doctor not found");

      // إنشاء سجل طبي
      const medicalRecord = await db.medicalRecord.create({
            data: {
                  patientId: validatedData.patientId,
                  doctorId: validatedData.doctorId,
                  diagnosis: validatedData.diagnosis,
                  treatmentDetails: validatedData.treatmentDetails,
                  datetime: new Date(),
            },
      });

      return medicalRecord;
};
