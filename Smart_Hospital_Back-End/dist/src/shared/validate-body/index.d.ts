import { NextFunction, Request, Response } from "express";
import { z } from "zod";
export declare const validateBody: (schema: z.AnyZodObject) => (req: Request, _: Response, next: NextFunction) => Promise<void>;
