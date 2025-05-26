export declare function setLabTestStatus({ id, status, }: {
    id: number;
    status: "completed" | "pending";
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
