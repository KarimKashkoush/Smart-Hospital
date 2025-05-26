"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDoctorBookings = void 0;
const http_status_codes_1 = require("http-status-codes");
const src_1 = require("src");
const app_error_1 = require("src/shared/app-error");
const getDoctorBookings = async (id) => {
    try {
        const timeSlots = await src_1.db.timeSlots.findMany({
            where: {
                doctorId: +id,
            },
            include: {
                bookings: {
                    include: {
                        patient: true,
                    }
                },
            },
        });
        const timeSlotsBookings = timeSlots.map((timeSlot) => {
            return timeSlot.bookings.map((booking) => ({
                id: booking.id,
                date: booking.date,
                patientId: booking.patientId,
                patientName: booking.patient?.name,
                status: booking.status,
            }));
        });
        const bookings = timeSlotsBookings.flat();
        return bookings;
    }
    catch {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid ID");
    }
};
exports.getDoctorBookings = getDoctorBookings;
//# sourceMappingURL=get-booking.service.js.map