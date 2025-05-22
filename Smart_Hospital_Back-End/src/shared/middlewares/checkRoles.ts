import { Role } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { jwtVerify, JWTPayload } from "jose";
import { env } from "src/env";

const JWT_SECRET = env.JWT_SECRET;

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string[];
  };
}

export const checkRoles = (requiredRoles: Role[]) => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const token = authHeader.split(" ")[1];
      const secret = new TextEncoder().encode(JWT_SECRET);

      const { payload } = await jwtVerify<
        JWTPayload & { id: string; role: string[] }
      >(token, secret);

      if (!payload?.role || !payload.id) {
        res.status(401).json({ message: "Unauthorized: Invalid token" });
        return;
      }

      const hasRole = requiredRoles.some((role) => payload.role.includes(role));
      if (!hasRole) {
        res.status(403).json({ message: "Forbidden: Insufficient role" });
        return;
      }

      req.user = {
        id: payload.id,
        role: payload.role,
      };

      next(); // let Express continue
    } catch (err) {
      console.log(req.headers.authorization);
      res.status(401).json({
        message: "Unauthorized: Token error",
        error: err instanceof Error ? err.message : String(err),
      });
    }
  };
};
