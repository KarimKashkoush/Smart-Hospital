"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTimeslots = void 0;
const http_status_codes_1 = require("http-status-codes");
const src_1 = require("src");
const app_error_1 = require("src/shared/app-error");
const createTimeslots = async (data) => {
    try {
        const { doctorId, shift, dayOfWeek, startTime, endTime } = data;
        if (isNaN(doctorId)) {
            throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "رقم الطبيب غير صحيح");
        }
        const doctor = await src_1.db.doctor.findFirst({
            where: { userId: doctorId },
        });
        if (!doctor) {
            throw new app_error_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "لم يتم العثور على الطبيب");
        }
        const timeslot = await src_1.db.timeSlots.create({
            data: {
                doctorId: doctor.userId,
                shift,
                dayOfWeek: dayOfWeek,
                startTime,
                endTime,
            },
        });
        return timeslot;
    }
    catch (error) {
        console.error(error);
        if (error instanceof app_error_1.AppError) {
            throw error;
        }
        const message = typeof error === "object" &&
            error !== null &&
            "message" in error &&
            typeof error.message === "string"
            ? `حدث خطأ أثناء إنشاء الموعد: ${error.message}`
            : "حدث خطأ أثناء إنشاء الموعد، يرجى المحاولة مرة أخرى.";
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, message);
    }
};
exports.createTimeslots = createTimeslots;
//# sourceMappingURL=create-timeslots.service.js.map