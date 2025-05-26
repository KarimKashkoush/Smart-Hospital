export declare const getAllTimeSlots: () => Promise<{
    id: number;
    dayOfWeek: import(".prisma/client").$Enums.Week;
    startTime: string;
    endTime: string;
    shift: import(".prisma/client").$Enums.Shift;
    doctorId: number;
    createdAt: Date;
}[]>;
export declare const getOneTimeSlot: (id: string) => Promise<{
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
} & {
    id: number;
    dayOfWeek: import(".prisma/client").$Enums.Week;
    startTime: string;
    endTime: string;
    shift: import(".prisma/client").$Enums.Shift;
    doctorId: number;
    createdAt: Date;
}>;
