"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReceptionistById = void 0;
const http_status_codes_1 = require("http-status-codes");
const src_1 = require("src");
const app_error_1 = require("src/shared/app-error");
const getReceptionistById = async (id) => {
    try {
        const receptionist = await src_1.db.receptionist.findFirst({
            where: {
                userId: Number(id),
            },
        });
        if (!receptionist) {
            throw new app_error_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "Receptionist was not found");
        }
        return receptionist;
    }
    catch (error) {
        console.error(error);
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid ID");
    }
};
exports.getReceptionistById = getReceptionistById;
//# sourceMappingURL=receptionist.service.js.map