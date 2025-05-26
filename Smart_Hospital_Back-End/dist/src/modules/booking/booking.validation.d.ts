import { z } from "zod";
export declare const createBookingSchema: z.ZodObject<{
    patientId: z.ZodNumber;
    timeSlotId: z.ZodNumber;
    dateTime: z.ZodEffects<z.ZodString, string, string>;
    patientName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    patientId?: number;
    timeSlotId?: number;
    patientName?: string;
    dateTime?: string;
}, {
    patientId?: number;
    timeSlotId?: number;
    patientName?: string;
    dateTime?: string;
}>;
export declare const updateBookingSchema: z.ZodObject<{
    bookingId: z.ZodNumber;
    status: z.ZodOptional<z.ZodString>;
    timeSlotId: z.ZodOptional<z.ZodNumber>;
    date: z.ZodEffects<z.ZodOptional<z.ZodString>, string, string>;
    patientName: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status?: string;
    date?: string;
    timeSlotId?: number;
    patientName?: string;
    bookingId?: number;
}, {
    status?: string;
    date?: string;
    timeSlotId?: number;
    patientName?: string;
    bookingId?: number;
}>;
export declare const rescheduleBookingSchema: z.ZodObject<{
    bookingId: z.ZodNumber;
    newTimeSlotId: z.ZodNumber;
    date: z.ZodString;
}, "strip", z.ZodTypeAny, {
    date?: string;
    bookingId?: number;
    newTimeSlotId?: number;
}, {
    date?: string;
    bookingId?: number;
    newTimeSlotId?: number;
}>;
