import z from "zod";
export declare const createDoctorSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    birthDate: z.ZodString;
    yearsofExperience: z.ZodString;
    specializationLong: z.ZodString;
    specializationShort: z.ZodString;
    education: z.ZodString;
    awards: z.ZodString;
    week: z.ZodArray<z.ZodNativeEnum<{
        Saturday: "Saturday";
        Sunday: "Sunday";
        Monday: "Monday";
        Tuesday: "Tuesday";
        Wednesday: "Wednesday";
        Thursday: "Thursday";
        Friday: "Friday";
    }>, "many">;
    timeSlots: z.ZodArray<z.ZodObject<{
        dayOfWeek: z.ZodEnum<["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]>;
        startTime: z.ZodString;
        endTime: z.ZodString;
        shift: z.ZodEnum<["Morning", "Evening"]>;
    }, "strip", z.ZodTypeAny, {
        shift?: "Morning" | "Evening";
        dayOfWeek?: "Saturday" | "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
        startTime?: string;
        endTime?: string;
    }, {
        shift?: "Morning" | "Evening";
        dayOfWeek?: "Saturday" | "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
        startTime?: string;
        endTime?: string;
    }>, "many">;
    categoryId: z.ZodNumber;
    name: z.ZodString;
    phone: z.ZodString;
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name?: string;
    username?: string;
    email?: string;
    phone?: string;
    birthDate?: string;
    password?: string;
    categoryId?: number;
    yearsofExperience?: string;
    education?: string;
    awards?: string;
    specializationLong?: string;
    specializationShort?: string;
    week?: ("Saturday" | "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday")[];
    timeSlots?: {
        shift?: "Morning" | "Evening";
        dayOfWeek?: "Saturday" | "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
        startTime?: string;
        endTime?: string;
    }[];
}, {
    name?: string;
    username?: string;
    email?: string;
    phone?: string;
    birthDate?: string;
    password?: string;
    categoryId?: number;
    yearsofExperience?: string;
    education?: string;
    awards?: string;
    specializationLong?: string;
    specializationShort?: string;
    week?: ("Saturday" | "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday")[];
    timeSlots?: {
        shift?: "Morning" | "Evening";
        dayOfWeek?: "Saturday" | "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
        startTime?: string;
        endTime?: string;
    }[];
}>;
export declare const labTestSchema: z.ZodObject<{
    patientId: z.ZodNumber;
    testname: z.ZodString;
}, "strip", z.ZodTypeAny, {
    patientId?: number;
    testname?: string;
}, {
    patientId?: number;
    testname?: string;
}>;
export declare const excuseUpdateSchema: z.ZodObject<{
    patientId: z.ZodNumber;
    status: z.ZodEnum<["approved", "rejected"]>;
}, "strip", z.ZodTypeAny, {
    status?: "approved" | "rejected";
    patientId?: number;
}, {
    status?: "approved" | "rejected";
    patientId?: number;
}>;
export declare const complateBookingSchema: z.ZodObject<{
    treatmentDetails: z.ZodString;
}, "strip", z.ZodTypeAny, {
    treatmentDetails?: string;
}, {
    treatmentDetails?: string;
}>;
