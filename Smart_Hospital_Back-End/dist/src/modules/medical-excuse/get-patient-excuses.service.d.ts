export declare function getPatientMedicalExcuses(patientId: number): Promise<{
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
}[]>;
