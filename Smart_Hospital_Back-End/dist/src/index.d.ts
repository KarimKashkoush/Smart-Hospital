import { PrismaClient } from "@prisma/client";
import multer from "multer";
export declare const app: import("express-serve-static-core").Express;
export declare const upload: multer.Multer;
export declare const db: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
