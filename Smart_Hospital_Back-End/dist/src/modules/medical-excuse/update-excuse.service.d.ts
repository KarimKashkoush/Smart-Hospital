import { z } from "zod";
import { updateMedicalExcuseSchema } from "./excuse.validation";
export declare function updateMedicalExcuse(medicalExcuseId: number, { doctorId, patientId, reason, endDate, startDate, attachment, status, rejectionReason, }: z.infer<typeof updateMedicalExcuseSchema> & {
    attachment?: Express.Multer.File;
    status?: string;
    rejectionReason?: string;
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
