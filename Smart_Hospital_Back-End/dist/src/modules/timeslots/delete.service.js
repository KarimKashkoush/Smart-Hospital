"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTimeSlot = void 0;
const http_status_codes_1 = require("http-status-codes");
const src_1 = require("src");
const app_error_1 = require("src/shared/app-error");
const deleteTimeSlot = async (id) => {
    try {
        const findTime = await src_1.db.timeSlots.findFirst({
            where: {
                id: Number(id),
            },
        });
        if (!findTime) {
            throw new app_error_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "Time slot not found");
        }
        const deletedTime = await src_1.db.timeSlots.delete({
            where: {
                id: Number(id),
            },
        });
        return { message: "Successful", deletedTime };
    }
    catch {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid ID");
    }
};
exports.deleteTimeSlot = deleteTimeSlot;
//# sourceMappingURL=delete.service.js.map