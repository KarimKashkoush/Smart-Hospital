import { z } from "zod";
export declare const signUpSchema: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    name: z.ZodString;
    gender: z.ZodEnum<["male", "female"]>;
    phone: z.ZodString;
    birthDate: z.ZodString;
    password: z.ZodString;
    emergencyContactName: z.ZodString;
    emergencyContactRelationship: z.ZodString;
    emergencyContactNumber: z.ZodString;
    medicalHistory: z.ZodArray<z.ZodString, "many">;
    additionalNotes: z.ZodString;
    university: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name?: string;
    username?: string;
    email?: string;
    gender?: "male" | "female";
    phone?: string;
    birthDate?: string;
    password?: string;
    emergencyContactName?: string;
    emergencyContactRelationship?: string;
    emergencyContactNumber?: string;
    medicalHistory?: string[];
    additionalNotes?: string;
    university?: string;
}, {
    name?: string;
    username?: string;
    email?: string;
    gender?: "male" | "female";
    phone?: string;
    birthDate?: string;
    password?: string;
    emergencyContactName?: string;
    emergencyContactRelationship?: string;
    emergencyContactNumber?: string;
    medicalHistory?: string[];
    additionalNotes?: string;
    university?: string;
}>;
export declare const signInSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username?: string;
    password?: string;
}, {
    username?: string;
    password?: string;
}>;
