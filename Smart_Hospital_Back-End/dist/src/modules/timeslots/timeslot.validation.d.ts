import { z } from "zod";
export declare const createTimeSlotSchema: z.ZodObject<{
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
}>;
export declare const updateTimeSlotSchema: z.ZodObject<{
    dayOfWeek: z.ZodOptional<z.ZodEnum<["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]>>;
    startTime: z.ZodOptional<z.ZodString>;
    endTime: z.ZodOptional<z.ZodString>;
    shift: z.ZodOptional<z.ZodEnum<["Morning", "Evening"]>>;
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
}>;
