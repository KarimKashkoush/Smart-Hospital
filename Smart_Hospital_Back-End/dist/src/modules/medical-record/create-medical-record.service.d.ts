import { createMedicalRecordSchema } from "./medical-record.validation";
import { z } from "zod";
type MedicalRecordData = z.infer<typeof createMedicalRecordSchema>;
export declare const createMedicalRecord: (data: MedicalRecordData) => Promise<{
    id: number;
    doctorId: number;
    patientId: number;
    diagnosis: string;
    treatmentDetails: string;
    datetime: Date;
}>;
export {};
