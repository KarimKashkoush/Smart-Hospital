import { z } from "zod";
export declare const createMedicalRecordSchema: z.ZodObject<{
    doctorId: z.ZodNumber;
    patientId: z.ZodNumber;
    diagnosis: z.ZodOptional<z.ZodString>;
    treatmentDetails: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    diagnosis?: string;
    treatmentDetails?: string;
    patientId?: number;
    doctorId?: number;
}, {
    diagnosis?: string;
    treatmentDetails?: string;
    patientId?: number;
    doctorId?: number;
}>;
