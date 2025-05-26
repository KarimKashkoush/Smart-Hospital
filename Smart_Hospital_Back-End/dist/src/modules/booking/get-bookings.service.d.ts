export declare const getBookings: () => Promise<({
    doctor: {
        createdAt: Date;
        name: string;
        userId: number;
        email: string;
        phone: string;
        birthDate: string;
        categoryId: number;
        yearsofExperience: string;
        education: string;
        awards: string;
        specializationLong: string;
        specializationShort: string;
        week: import(".prisma/client").$Enums.Week[];
        profileImage: string | null;
    };
    bookings: ({
        patient: {
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
        };
    } & {
        id: number;
        createdAt: Date;
        date: Date;
        patientId: number | null;
        timeSlotId: number;
        patientName: string;
        status: string;
    })[];
} & {
    id: number;
    dayOfWeek: import(".prisma/client").$Enums.Week;
    startTime: string;
    endTime: string;
    shift: import(".prisma/client").$Enums.Shift;
    doctorId: number;
    createdAt: Date;
})[]>;
