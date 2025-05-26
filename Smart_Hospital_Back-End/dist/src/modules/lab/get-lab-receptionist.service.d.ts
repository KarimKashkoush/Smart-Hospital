export declare const getLabReceptionistDetails: (id: string) => Promise<{
    id: number;
    name: string;
    email: string;
    phone: string;
    gender: import(".prisma/client").$Enums.Gender;
    birthDate: string;
    salary: number;
    bonus: number;
    supervisor: {
        name: string;
        userId: number;
    };
    username: string;
    avatar: string;
    role: import(".prisma/client").$Enums.Role;
}>;
