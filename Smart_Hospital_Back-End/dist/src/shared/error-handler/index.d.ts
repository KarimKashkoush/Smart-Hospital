import { Response } from "express";
import { AppError } from "../app-error";
export declare const errorHandler: (err: AppError, res?: Response) => void;
