import { z } from "zod";
export declare const createReceptionistSchema: z.ZodObject<{
    username: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    password: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    department: z.ZodOptional<z.ZodString>;
    gender: z.ZodOptional<z.ZodEnum<["male", "female"]>>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    username?: string;
    email?: string;
    gender?: "male" | "female";
    phone?: string;
    password?: string;
    department?: string;
}, {
    name?: string;
    username?: string;
    email?: string;
    gender?: "male" | "female";
    phone?: string;
    password?: string;
    department?: string;
}>;
export declare const updateReceptionistSchema: z.ZodObject<{
    username: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    gender: z.ZodOptional<z.ZodEnum<["male", "female"]>>;
    email: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    image?: string;
    username?: string;
    email?: string;
    gender?: "male" | "female";
    phone?: string;
    password?: string;
}, {
    name?: string;
    image?: string;
    username?: string;
    email?: string;
    gender?: "male" | "female";
    phone?: string;
    password?: string;
}>;
