import { z } from "zod";


export const createMedicalExcuseSchema = z.object({
  reason: z.string(),
  endDate: z.string().refine(val => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  startDate: z.string().refine(val => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  doctorId: z.string().transform(val => Number(val)),
  patientId: z.string().transform(val => Number(val)),
  categoryId: z.string().transform(val => Number(val)),
  fullName: z.string(),
  email: z.string().email(),
  rejectionReason: z.string().optional().default(""),
});

export const updateMedicalExcuseSchema = z.object({
  patientId: z.coerce.number().int().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  reason: z.string().optional(),
  doctorId: z.coerce.number().int().optional(),
  rejectionReason: z.string().optional(),
});
