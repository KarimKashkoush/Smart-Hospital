import { z } from "zod";
import { createLabTestSchema } from "./lab.validation";
export declare function createLabTest({ date, attachment, name, status, referringDoctorId, patientUsername, }: z.infer<typeof createLabTestSchema> & {
    attachment?: Express.Multer.File;
}): Promise<{
    id: number;
    createdAt: Date;
    name: string;
    date: string;
    patientId: number;
    status: import(".prisma/client").$Enums.TestStatus;
    referringDoctorId: number;
    attachment: string | null;
    accepted: boolean;
}>;
