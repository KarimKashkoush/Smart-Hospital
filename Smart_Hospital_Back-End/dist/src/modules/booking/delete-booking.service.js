"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = void 0;
const http_status_codes_1 = require("http-status-codes");
const src_1 = require("src");
const app_error_1 = require("src/shared/app-error");
const deleteBooking = async (id) => {
    const findBooking = await src_1.db.booking.findFirst({
        where: {
            id: +id,
        },
    });
    if (!findBooking) {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "Booking not found");
    }
    const deletedBooking = await src_1.db.booking.delete({
        where: {
            id: +id,
        },
    });
    return deletedBooking;
};
exports.deleteBooking = deleteBooking;
//# sourceMappingURL=delete-booking.service.js.map