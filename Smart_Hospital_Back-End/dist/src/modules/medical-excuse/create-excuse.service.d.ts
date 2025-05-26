import { z } from "zod";
import { createMedicalExcuseSchema } from "./excuse.validation";
export declare function createMedicalExcuse({ reason, endDate, doctorId, startDate, attachment, patientId, fullName, email, categoryId, }: z.infer<typeof createMedicalExcuseSchema> & {
    attachment: Express.Multer.File;
    fullName: string;
    email: string;
    categoryId?: number;
}): Promise<{
    id: number;
    doctorId: number;
    createdAt: Date;
    patientId: number;
    status: string | null;
    email: string;
    updatedAt: Date;
    categoryId: number;
    image: string | null;
    fullName: string;
    reason: string;
    startDate: Date;
    endDate: Date;
    rejectionReason: string | null;
}>;
