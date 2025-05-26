"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDoctorDetails = exports.getDoctors = void 0;
const http_status_codes_1 = require("http-status-codes");
const src_1 = require("src");
const app_error_1 = require("src/shared/app-error");
const getDoctors = async () => {
    try {
        const doctors = await src_1.db.doctor.findMany({
            include: {
                timeSlots: {
                    include: {
                        bookings: true,
                    },
                },
            },
        });
        const doctorsWithSlots = doctors.map((doctor) => {
            const timeSlots = doctor.timeSlots.map((slot) => {
                const booked = slot.bookings.map((booking) => ({
                    date: booking.date,
                    dayOfWeek: slot.dayOfWeek,
                }));
                return {
                    id: slot.id,
                    dayOfWeek: slot.dayOfWeek,
                    shift: slot.shift,
                    startTime: slot.startTime,
                    endTime: slot.endTime,
                    booked,
                };
            });
            return {
                ...doctor,
                timeSlots,
            };
        });
        return doctorsWithSlots;
    }
    catch {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Failed to fetch doctors");
    }
};
exports.getDoctors = getDoctors;
const getDoctorDetails = async (id) => {
    try {
        const doctor = await src_1.db.doctor.findFirst({
            where: {
                userId: Number(id),
            },
            include: {
                medicalExcuse: true,
            },
        });
        if (!doctor) {
            throw new app_error_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "Doctor was not found");
        }
        const timeSlots = await src_1.db.timeSlots.findMany({
            where: {
                doctorId: doctor.userId,
            },
            include: {
                bookings: true,
            },
        });
        const bookings = timeSlots.map((slot) => {
            const booked = slot.bookings.map((booking) => ({
                date: booking.date,
                dayOfWeek: slot.dayOfWeek,
            }));
            return {
                id: slot.id,
                dayOfWeek: slot.dayOfWeek,
                shift: slot.shift,
                startTime: slot.startTime,
                endTime: slot.endTime,
                booked,
            };
        });
        return { ...doctor, timeSlots: bookings };
    }
    catch {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid ID");
    }
};
exports.getDoctorDetails = getDoctorDetails;
//# sourceMappingURL=get-doctor.service.js.map