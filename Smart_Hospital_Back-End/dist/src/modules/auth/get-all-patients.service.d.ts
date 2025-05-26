export declare const getAllPatients: () => Promise<{
    username: string;
    avatar: string;
    user: {
        username: string;
        image: string;
    };
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
}[]>;
