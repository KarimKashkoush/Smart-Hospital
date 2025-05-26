export declare const getDoctorBookings: (id: string) => Promise<{
    id: number;
    date: Date;
    patientId: number;
    patientName: string;
    status: string;
}[]>;
