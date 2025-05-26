export declare const createCategory: ({ name, image, description, link, }: {
    name: string;
    image: Express.Multer.File;
    description: string;
    link: string;
}) => Promise<{
    id: number;
    createdAt: Date;
    name: string;
    link: string | null;
    image: string | null;
    description: string | null;
}>;
