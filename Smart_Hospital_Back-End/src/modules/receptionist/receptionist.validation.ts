import { z } from "zod";

export const createReceptionistSchema = z.object({
  username: z.string(),
  name: z.string().optional(),
  password: z.string(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  department: z.string().optional(), // تأكد إن department هنا
  gender: z.enum(["male", "female"]).optional(),
});



export const updateReceptionistSchema = z.object({
  username: z.string().optional(),
  password: z.string().optional(),
  name: z.string().optional(),
  gender: z.enum(["male", "female"]).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  image: z.string().optional(),
});