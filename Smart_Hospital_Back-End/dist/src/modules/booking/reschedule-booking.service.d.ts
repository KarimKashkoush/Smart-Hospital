export declare function rescheduleBooking(bookingId: number, newTimeSlotId: number, date: string): Promise<{
    doctorBookings: {
        id: number;
        date: Date;
        patientId: number;
        patientName: string;
        status: string;
    }[];
    booking: {
        timeSlot: {
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
        };
        id: number;
        createdAt: Date;
        date: Date;
        patientId: number | null;
        timeSlotId: number;
        patientName: string;
        status: string;
    };
}>;
