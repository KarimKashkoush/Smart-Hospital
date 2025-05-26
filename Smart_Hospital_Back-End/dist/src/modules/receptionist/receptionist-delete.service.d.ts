export declare function deleteReceptionist(id: string): Promise<{
    createdAt: Date;
    name: string | null;
    userId: number;
    email: string | null;
    gender: string | null;
    phone: string | null;
    department: string | null;
}>;
