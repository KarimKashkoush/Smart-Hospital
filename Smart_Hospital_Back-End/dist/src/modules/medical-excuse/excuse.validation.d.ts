import { z } from "zod";
export declare const createMedicalExcuseSchema: z.ZodObject<{
    reason: z.ZodString;
    endDate: z.ZodEffects<z.ZodString, string, string>;
    startDate: z.ZodEffects<z.ZodString, string, string>;
    doctorId: z.ZodEffects<z.ZodString, number, string>;
    patientId: z.ZodEffects<z.ZodString, number, string>;
    categoryId: z.ZodEffects<z.ZodString, number, string>;
    fullName: z.ZodString;
    email: z.ZodString;
    rejectionReason: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    email?: string;
    categoryId?: number;
    patientId?: number;
    doctorId?: number;
    fullName?: string;
    reason?: string;
    startDate?: string;
    endDate?: string;
    rejectionReason?: string;
}, {
    email?: string;
    categoryId?: string;
    patientId?: string;
    doctorId?: string;
    fullName?: string;
    reason?: string;
    startDate?: string;
    endDate?: string;
    rejectionReason?: string;
}>;
export declare const updateMedicalExcuseSchema: z.ZodObject<{
    patientId: z.ZodOptional<z.ZodNumber>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    reason: z.ZodOptional<z.ZodString>;
    doctorId: z.ZodOptional<z.ZodNumber>;
    rejectionReason: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    patientId?: number;
    doctorId?: number;
    reason?: string;
    startDate?: string;
    endDate?: string;
    rejectionReason?: string;
}, {
    patientId?: number;
    doctorId?: number;
    reason?: string;
    startDate?: string;
    endDate?: string;
    rejectionReason?: string;
}>;
