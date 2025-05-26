"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReceptionist = deleteReceptionist;
const http_status_codes_1 = require("http-status-codes");
const src_1 = require("src");
const app_error_1 = require("src/shared/app-error");
async function deleteReceptionist(id) {
    try {
        const findReceptionist = await src_1.db.receptionist.findFirst({
            where: {
                userId: +id,
            },
        });
        if (!findReceptionist) {
            throw new app_error_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "Receptionist was not found");
        }
        const receptionist = await src_1.db.receptionist.delete({
            where: { userId: +id },
        });
        return receptionist;
    }
    catch {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid ID");
    }
}
//# sourceMappingURL=receptionist-delete.service.js.map