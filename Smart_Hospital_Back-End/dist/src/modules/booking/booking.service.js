"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBooking = void 0;
const http_status_codes_1 = require("http-status-codes");
const src_1 = require("src");
const app_error_1 = require("src/shared/app-error");
const createBooking = async (data) => {
    const { timeSlotId, dateTime, patientId, patientName } = data;
    if (!dateTime) {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "تاريخ ووقت الحجز مطلوب");
    }
    const date = new Date(dateTime);
    if (isNaN(date.getTime())) {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "تنسيق تاريخ ووقت غير صحيح");
    }
    if (!patientName) {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "اسم المريض مطلوب");
    }
    const timeSlot = await src_1.db.timeSlots.findUnique({
        where: { id: timeSlotId },
        select: { doctorId: true },
    });
    if (!timeSlot) {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "الطبيب أو الوقت غير موجود");
    }
    if (patientId) {
        const existingBooking = await src_1.db.booking.findFirst({
            where: {
                patient: { userId: patientId },
                timeSlot: { doctorId: timeSlot.doctorId },
                status: { not: "Cancelled" }
            },
        });
        if (existingBooking) {
            throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "لا يمكنك الحجز مع نفس الطبيب أكثر من مرة.");
        }
    }
    const booking = await src_1.db.booking.create({
        data: {
            timeSlot: { connect: { id: timeSlotId } },
            date,
            patientName,
            ...(patientId && {
                patient: { connect: { userId: patientId } },
            }),
        },
    });
    return booking;
};
exports.createBooking = createBooking;
//# sourceMappingURL=booking.service.js.map