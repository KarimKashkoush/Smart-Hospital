export declare const getMedicalRecords: () => Promise<({
    doctor: {
        name: string;
        userId: number;
        email: string;
        phone: string;
    };
    patient: {
        name: string;
        userId: number;
        email: string;
        phone: string;
    };
} & {
    id: number;
    doctorId: number;
    patientId: number;
    diagnosis: string;
    treatmentDetails: string;
    datetime: Date;
})[]>;
