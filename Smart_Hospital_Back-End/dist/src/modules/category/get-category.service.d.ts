export declare const getCategories: () => Promise<({
    doctor: {
        name: string;
        userId: number;
        email: string;
        phone: string;
        yearsofExperience: string;
        awards: string;
        specializationLong: string;
        specializationShort: string;
    }[];
} & {
    id: number;
    createdAt: Date;
    name: string;
    link: string | null;
    image: string | null;
    description: string | null;
})[]>;
