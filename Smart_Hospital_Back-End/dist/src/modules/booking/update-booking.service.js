"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBooking = void 0;
const src_1 = require("src");
const app_error_1 = require("src/shared/app-error");
const http_status_codes_1 = require("http-status-codes");
const updateBooking = async (data) => {
    const { bookingId, status, timeSlotId, date, patientName } = data;
    const booking = await src_1.db.booking.findUnique({ where: { id: bookingId } });
    if (!booking) {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "الحجز غير موجود");
    }
    let newDate = undefined;
    if (date) {
        newDate = new Date(date);
        if (isNaN(newDate.getTime())) {
            throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "تنسيق تاريخ غير صحيح");
        }
    }
    if (timeSlotId) {
        const timeSlot = await src_1.db.timeSlots.findUnique({
            where: { id: timeSlotId },
        });
        if (!timeSlot) {
            throw new app_error_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "الوقت المختار غير موجود");
        }
    }
    const updateData = {};
    if (status)
        updateData.status = status;
    if (timeSlotId)
        updateData.timeSlot = { connect: { id: timeSlotId } };
    if (newDate)
        updateData.date = newDate;
    if (patientName)
        updateData.patientName = patientName;
    const updatedBooking = await src_1.db.booking.update({
        where: { id: bookingId },
        data: updateData,
    });
    return updatedBooking;
};
exports.updateBooking = updateBooking;
//# sourceMappingURL=update-booking.service.js.map