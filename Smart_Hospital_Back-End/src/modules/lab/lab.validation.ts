import { z } from "zod";

export const createLabReceptionistSchema = z.object({
  username: z.string().min(1),
  name: z.string().min(1),
  password: z.string().min(8),
  phone: z.string().min(10),
  email: z.string().email(),
  gender: z.enum(["male", "female"]),
  birthDate: z.string(),
  supervisorDoctorId: z.string(),
});

export const setLabReceptionistSalarySchema = z.object({
  id: z.number(),
  salary: z.number(),
  bonus: z.number(),
});

export const createLabTestSchema = z.object({
  name: z.string(),
  date: z.string(),
  status: z.enum(["pending", "completed"]).optional().default("pending"),
  referringDoctorId: z.preprocess((val) => Number(val), z.number()),
  patientUsername: z.string(),
});
