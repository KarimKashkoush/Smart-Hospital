export declare const getPatientById: (id: string) => Promise<{
    username: string;
    avatar: string;
    user: {
        username: string;
        image: string;
    };
    LabTest: {
        id: number;
        createdAt: Date;
        name: string;
        date: string;
        patientId: number;
        status: import(".prisma/client").$Enums.TestStatus;
        referringDoctorId: number;
        attachment: string | null;
        accepted: boolean;
    }[];
    medicalRecord: {
        id: number;
        doctorId: number;
        patientId: number;
        diagnosis: string;
        treatmentDetails: string;
        datetime: Date;
    }[];
    MedicalExcuse: {
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
    }[];
    createdAt: Date;
    name: string;
    userId: number;
    email: string;
    gender: import(".prisma/client").$Enums.Gender;
    phone: string;
    birthDate: string;
    updatedAt: Date;
    emergencyContactName: string;
    emergencyContactNumber: string;
    emergencyContactRelationship: string;
    medicalHistory: string[];
    additionalNotes: string;
    university: string;
}>;
