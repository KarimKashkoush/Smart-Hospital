export declare function setLabReceptionistSalary({ id, salary, bonus, }: {
    id: string;
    salary: number;
    bonus: number;
}): Promise<{
    createdAt: Date;
    name: string;
    userId: number;
    email: string;
    gender: import(".prisma/client").$Enums.Gender;
    phone: string;
    birthDate: string;
    onBoarding: Date;
    salary: number | null;
    bonus: number | null;
    supervisorId: number;
}>;
