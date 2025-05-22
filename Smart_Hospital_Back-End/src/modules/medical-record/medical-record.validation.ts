import { z } from "zod";

export const createMedicalRecordSchema = z.object({
      doctorId: z.number(),
      patientId: z.number(),
      diagnosis: z.string().optional(),          
      treatmentDetails: z.string().optional(),   
});
