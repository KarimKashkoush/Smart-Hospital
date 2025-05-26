export declare const getDoctors: () => Promise<{
    timeSlots: {
        id: number;
        dayOfWeek: import(".prisma/client").$Enums.Week;
        shift: import(".prisma/client").$Enums.Shift;
        startTime: string;
        endTime: string;
        booked: {
            date: Date;
            dayOfWeek: import(".prisma/client").$Enums.Week;
        }[];
    }[];
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
}[]>;
export declare const getDoctorDetails: (id: string) => Promise<{
    timeSlots: {
        id: number;
        dayOfWeek: import(".prisma/client").$Enums.Week;
        shift: import(".prisma/client").$Enums.Shift;
        startTime: string;
        endTime: string;
        booked: {
            date: Date;
            dayOfWeek: import(".prisma/client").$Enums.Week;
        }[];
    }[];
    medicalExcuse: {
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
}>;
