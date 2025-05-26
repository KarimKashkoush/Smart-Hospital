import zod from "zod";
import { signUpSchema } from "./auth.validation";
import { Patient } from "@prisma/client";
type SignUpData = zod.infer<typeof signUpSchema>;
export declare const signUp: ({ password, username, gender, phone, birthDate, email, name, emergencyContactName, emergencyContactNumber, emergencyContactRelationship, medicalHistory, additionalNotes, university, }: SignUpData) => Promise<{
    token: string;
    user: Patient & {
        username: string;
        avatar: string;
    };
}>;
export {};
