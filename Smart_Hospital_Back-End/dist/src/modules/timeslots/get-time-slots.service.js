"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneTimeSlot = exports.getAllTimeSlots = void 0;
const http_status_codes_1 = require("http-status-codes");
const src_1 = require("src");
const app_error_1 = require("src/shared/app-error");
const getAllTimeSlots = async () => {
    try {
        const timeslots = await src_1.db.timeSlots.findMany();
        return timeslots;
    }
    catch {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid ID");
    }
};
exports.getAllTimeSlots = getAllTimeSlots;
const getOneTimeSlot = async (id) => {
    try {
        const timeSlot = await src_1.db.timeSlots.findFirst({
            where: {
                id: Number(id),
            },
            include: {
                doctor: true,
            },
        });
        if (!timeSlot) {
            throw new app_error_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "Time slot not found");
        }
        return timeSlot;
    }
    catch {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid ID");
    }
};
exports.getOneTimeSlot = getOneTimeSlot;
//# sourceMappingURL=get-time-slots.service.js.map