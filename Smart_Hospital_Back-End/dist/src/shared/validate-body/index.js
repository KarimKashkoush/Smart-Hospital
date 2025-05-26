"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = void 0;
const zod_1 = require("zod");
const app_error_1 = require("../app-error");
const http_status_codes_1 = require("http-status-codes");
const validateBody = (schema) => async (req, _, next) => {
    try {
        const value = await schema.parseAsync(req.body);
        Object.assign(req, value);
        return next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const formattedErrors = {};
            error.issues.forEach((issue) => {
                const key = issue.path.join(".");
                formattedErrors[key] = issue.message;
            });
            return next(new app_error_1.AppError(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY, JSON.stringify(formattedErrors)));
        }
        return next(error);
    }
};
exports.validateBody = validateBody;
//# sourceMappingURL=index.js.map