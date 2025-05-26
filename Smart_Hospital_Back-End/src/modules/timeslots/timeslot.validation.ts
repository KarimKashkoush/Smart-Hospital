import { z } from "zod";


export const createTimeSlotSchema = z.object({
  dayOfWeek: z.enum(["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
  shift: z.enum(["Morning", "Evening"]),
});

export const updateTimeSlotSchema = z.object({
  dayOfWeek: z.enum(["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]).optional(),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).optional(),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).optional(),
  shift: z.enum(["Morning", "Evening"]).optional(),
});

