"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookings = void 0;
const http_status_codes_1 = require("http-status-codes");
const src_1 = require("src");
const app_error_1 = require("src/shared/app-error");
const getBookings = async () => {
    try {
        const bookedSlots = await src_1.db.timeSlots.findMany({
            where: {
                bookings: {
                    some: {},
                },
            },
            include: {
                bookings: {
                    include: {
                        patient: true,
                    },
                },
                doctor: true,
            },
        });
        return bookedSlots;
    }
    catch {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Something went wrong");
    }
};
exports.getBookings = getBookings;
//# sourceMappingURL=get-bookings.service.js.map