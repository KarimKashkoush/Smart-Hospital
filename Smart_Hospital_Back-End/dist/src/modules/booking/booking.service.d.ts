type CreateBookingData = {
    timeSlotId: number;
    patientId?: number;
    dateTime: string | Date;
    patientName: string;
};
export declare const createBooking: (data: CreateBookingData) => Promise<{
    id: number;
    createdAt: Date;
    date: Date;
    patientId: number | null;
    timeSlotId: number;
    patientName: string;
    status: string;
}>;
export {};
