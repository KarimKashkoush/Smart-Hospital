type UpdateBookingData = {
    bookingId: number;
    status?: string;
    timeSlotId?: number;
    date?: string | Date;
    patientName?: string;
};
export declare const updateBooking: (data: UpdateBookingData) => Promise<{
    id: number;
    createdAt: Date;
    date: Date;
    patientId: number | null;
    timeSlotId: number;
    patientName: string;
    status: string;
}>;
export {};
