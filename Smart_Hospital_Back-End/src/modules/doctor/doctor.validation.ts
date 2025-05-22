import { Week } from "@prisma/client";
import z from "zod";
import { createTimeSlotSchema } from "../timeslots/timeslot.validation";

export const createDoctorSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  birthDate: z.string(),
  yearsofExperience: z.string(),
  specializationLong: z.string(),
  specializationShort: z.string(),
  education: z.string(),
  awards: z.string(),
  week: z.array(z.nativeEnum(Week)).min(1, "You must select at least one day"),
  timeSlots: z.array(createTimeSlotSchema),
  categoryId: z.number(),
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
});

export const labTestSchema = z.object({
  patientId: z.number(),
  testname: z.string().min(1),
});

export const excuseUpdateSchema = z.object({
  patientId: z.number(),
  status: z.enum(["approved", "rejected"]),
});

export const complateBookingSchema = z.object({
  treatmentDetails: z.string(),
});