import { z } from "zod";
import { createReceptionistSchema } from "./receptionist.validation";
export declare const createReceptionist: ({ username, name, password, phone, email, department, gender, }: z.infer<typeof createReceptionistSchema>, image?: Express.Multer.File) => Promise<{
    username: string;
    avatar: string;
    id: number;
    createdAt: Date;
    passwordHash: string;
    role: import(".prisma/client").$Enums.Role;
    image: string | null;
}>;
