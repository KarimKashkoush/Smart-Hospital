import { NextFunction, Request, Response } from "express";
import { ZodError, z } from "zod";
import { AppError } from "../app-error";
import { StatusCodes } from "http-status-codes";

export const validateBody =
  (schema: z.AnyZodObject) =>
  async (req: Request, _: Response, next: NextFunction) => {
    try {
      const value = await schema.parseAsync(req.body);
      Object.assign(req, value);
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors: Record<string, string> = {};

        error.issues.forEach((issue) => {
          const key = issue.path.join(".");
          formattedErrors[key] = issue.message;
        });

        return next(
          new AppError(
            StatusCodes.UNPROCESSABLE_ENTITY,
            JSON.stringify(formattedErrors),
          ),
        );
      }
      return next(error);
    }
  };
