import { z } from "zod";
export declare const createLabReceptionistSchema: z.ZodObject<{
    username: z.ZodString;
    name: z.ZodString;
    password: z.ZodString;
    phone: z.ZodString;
    email: z.ZodString;
    gender: z.ZodEnum<["male", "female"]>;
    birthDate: z.ZodString;
    supervisorDoctorId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name?: string;
    username?: string;
    email?: string;
    gender?: "male" | "female";
    phone?: string;
    birthDate?: string;
    password?: string;
    supervisorDoctorId?: string;
}, {
    name?: string;
    username?: string;
    email?: string;
    gender?: "male" | "female";
    phone?: string;
    birthDate?: string;
    password?: string;
    supervisorDoctorId?: string;
}>;
export declare const setLabReceptionistSalarySchema: z.ZodObject<{
    id: z.ZodNumber;
    salary: z.ZodNumber;
    bonus: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id?: number;
    salary?: number;
    bonus?: number;
}, {
    id?: number;
    salary?: number;
    bonus?: number;
}>;
export declare const createLabTestSchema: z.ZodObject<{
    name: z.ZodString;
    date: z.ZodString;
    status: z.ZodDefault<z.ZodOptional<z.ZodEnum<["pending", "completed"]>>>;
    referringDoctorId: z.ZodEffects<z.ZodNumber, number, unknown>;
    patientUsername: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name?: string;
    status?: "pending" | "completed";
    date?: string;
    referringDoctorId?: number;
    patientUsername?: string;
}, {
    name?: string;
    status?: "pending" | "completed";
    date?: string;
    referringDoctorId?: unknown;
    patientUsername?: string;
}>;
