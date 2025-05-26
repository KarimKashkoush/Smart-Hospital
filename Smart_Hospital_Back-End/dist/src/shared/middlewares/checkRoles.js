"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRoles = void 0;
const jose_1 = require("jose");
const env_1 = require("src/env");
const JWT_SECRET = env_1.env.JWT_SECRET;
const checkRoles = (requiredRoles) => {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            const token = authHeader.split(" ")[1];
            const secret = new TextEncoder().encode(JWT_SECRET);
            const { payload } = await (0, jose_1.jwtVerify)(token, secret);
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
            next();
        }
        catch (err) {
            console.log(req.headers.authorization);
            res.status(401).json({
                message: "Unauthorized: Token error",
                error: err instanceof Error ? err.message : String(err),
            });
        }
    };
};
exports.checkRoles = checkRoles;
//# sourceMappingURL=checkRoles.js.map