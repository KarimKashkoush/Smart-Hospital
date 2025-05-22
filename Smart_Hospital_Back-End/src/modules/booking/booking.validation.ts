import { z } from "zod";

export const createBookingSchema = z.object({
  patientId: z.number().int().optional(),
  timeSlotId: z.number().int(),
  date: z.string(),
  patientName: z.string(),
});

export const rescheduleBookingSchema = z.object({
  bookingId: z.number(),
  newTimeSlotId: z.number(),
  date: z.string(),
});
