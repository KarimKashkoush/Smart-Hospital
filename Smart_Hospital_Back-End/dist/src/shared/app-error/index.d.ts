import { StatusCodes } from "http-status-codes";
export declare class AppError extends Error {
    statusCode: StatusCodes;
    isOperational: boolean;
    stack: string;
    constructor(statusCode: StatusCodes, message: string, isOperational?: boolean, stack?: string);
}
