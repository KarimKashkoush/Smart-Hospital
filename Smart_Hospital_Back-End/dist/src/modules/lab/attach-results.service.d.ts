export declare function attachResutls({ id, file, }: {
    id: number;
    file: Express.Multer.File;
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
