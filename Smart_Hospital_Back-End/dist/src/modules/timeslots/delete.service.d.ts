export declare const deleteTimeSlot: (id: string) => Promise<{
    message: string;
    deletedTime: {
        id: number;
        dayOfWeek: import(".prisma/client").$Enums.Week;
        startTime: string;
        endTime: string;
        shift: import(".prisma/client").$Enums.Shift;
        doctorId: number;
        createdAt: Date;
    };
}>;
