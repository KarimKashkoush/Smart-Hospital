import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string(),
  email: z.string().email("Invalid email"),
  name: z.string(),
  gender: z.enum(["male", "female"]),
  phone: z.string(),
  birthDate: z.string(),
  password: z
    .string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, {
      message:
        "Password must at least be 8 letters long, contain at least one uppercase character, one lowercase character, and one special character.",
    })
    .min(8, "Password is required"),
  emergencyContactName: z.string(),
  emergencyContactRelationship: z.string(),
  emergencyContactNumber: z.string(),
  medicalHistory: z.string().array(),
  additionalNotes: z.string(),
  university: z.string(),
});

export const signInSchema = z.object({
  username: z.string(),
  password: z.string().min(8),
});
