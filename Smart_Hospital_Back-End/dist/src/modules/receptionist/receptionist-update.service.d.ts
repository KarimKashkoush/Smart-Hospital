type updateReceptionist = {
    username?: string;
    email?: string;
    passwordHash?: string;
    gender?: string;
    phone?: string;
    name?: string;
};
export declare const updateReceptionist: (id: string, data: updateReceptionist, image?: Express.Multer.File) => Promise<{
    updateReceptionist: {
        createdAt: Date;
        name: string | null;
        userId: number;
        email: string | null;
        gender: string | null;
        phone: string | null;
        department: string | null;
    };
}>;
export {};
