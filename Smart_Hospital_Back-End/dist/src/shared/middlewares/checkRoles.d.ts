import { Role } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
export interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        role: string[];
    };
}
export declare const checkRoles: (requiredRoles: Role[]) => (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
