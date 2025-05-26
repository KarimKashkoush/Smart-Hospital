"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTimeSlot = void 0;
const http_status_codes_1 = require("http-status-codes");
const src_1 = require("src");
const app_error_1 = require("src/shared/app-error");
const updateTimeSlot = async (id, data) => {
    try {
        const findTime = await src_1.db.timeSlots.findUnique({
            where: { id: Number(id) },
        });
        if (!findTime) {
            throw new app_error_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "Time slot not found");
        }
        const updatedTime = await src_1.db.timeSlots.update({
            where: { id: Number(id) },
            data: {
                ...(data.doctorId !== undefined ? { doctor: { connect: { userId: data.doctorId } } } : {}),
                ...(data.shift !== undefined ? { shift: data.shift } : {}),
                ...(data.dayOfWeek !== undefined ? { dayOfWeek: data.dayOfWeek } : {}),
                ...(data.startTime !== undefined ? { startTime: data.startTime } : {}),
                ...(data.endTime !== undefined ? { endTime: data.endTime } : {}),
            },
        });
        return { message: "Successful", updatedTime };
    }
    catch {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid ID or update failed");
    }
};
exports.updateTimeSlot = updateTimeSlot;
//# sourceMappingURL=update.service.js.map