import { z } from "zod";

export const createTimeSlotSchema = z.object({
  hour: z.coerce.date(),
  shift: z.enum(["Morning", "Evening"]),
});

export const updateTimeSlotSchema = z.object({
  hour: z.coerce.date().optional(),
  shift: z.enum(["Morning", "Evening"]),
});
