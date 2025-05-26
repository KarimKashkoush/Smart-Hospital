import { z } from "zod";

export const createBookingSchema = z.object({
  patientId: z.number().int(),
  timeSlotId: z.number().int(),
  dateTime: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date-time format",
  }),
  patientName: z.string(),
});

export const updateBookingSchema = z.object({
  bookingId: z.number(),
  status: z.string().optional(),
  timeSlotId: z.number().optional(),
  date: z.string().optional().refine(val => !val || !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  patientName: z.string().optional(),
});

export const rescheduleBookingSchema = z.object({
  bookingId: z.number(),
  newTimeSlotId: z.number(),
  date: z.string(),
});
