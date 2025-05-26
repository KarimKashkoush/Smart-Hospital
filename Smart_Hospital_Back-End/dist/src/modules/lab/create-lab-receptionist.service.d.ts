import { z } from "zod";
import { createLabReceptionistSchema } from "./lab.validation";
export declare const createLabReceptionist: ({ username, name, password, phone, email, gender, birthDate, supervisorDoctorId, }: z.infer<typeof createLabReceptionistSchema>) => Promise<{
    username: string;
    avatar: string;
    createdAt: Date;
    name: string;
    userId: number;
    email: string;
    gender: import(".prisma/client").$Enums.Gender;
    phone: string;
    birthDate: string;
    onBoarding: Date;
    salary: number | null;
    bonus: number | null;
    supervisorId: number;
}>;
