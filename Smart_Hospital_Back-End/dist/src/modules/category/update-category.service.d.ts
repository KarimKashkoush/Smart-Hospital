import { Category } from "@prisma/client";
export declare const updateOneCategory: ({ name, image, id, }: {
    name: string;
    image: Express.Multer.File;
    id: string;
}) => Promise<Category>;
