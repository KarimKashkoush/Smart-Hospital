"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rescheduleBooking = rescheduleBooking;
const http_status_codes_1 = require("http-status-codes");
const src_1 = require("src");
const app_error_1 = require("src/shared/app-error");
const logger_1 = require("src/shared/logger");
const get_booking_service_1 = require("./get-booking.service");
const date_fns_1 = require("date-fns");
const week_days_1 = require("src/shared/constants/week-days");
async function rescheduleBooking(bookingId, newTimeSlotId, date) {
    const oldBooking = await src_1.db.booking.findUnique({
        where: { id: +bookingId },
        include: {
            timeSlot: { include: { doctor: true } },
        },
    });
    const day = (0, date_fns_1.getDay)(date);
    const doctorWorkDays = oldBooking.timeSlot.doctor.week;
    const isDoctorAvailable = doctorWorkDays
        .map((week) => week.toString())
        .includes(week_days_1.weekDaysArray[day]);
    if (!isDoctorAvailable) {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Doctor is not availabe in that day");
    }
    try {
        const isBooked = (await src_1.db.booking.count({
            where: { timeSlotId: newTimeSlotId, date },
        })) > 0;
        if (isBooked) {
            throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "This date is already booked in the specified time slot");
        }
        const record = await src_1.db.booking.update({
            where: {
                id: bookingId,
            },
            data: {
                date,
                patient: {
                    connect: {
                        userId: oldBooking.patientId,
                    },
                },
                timeSlot: {
                    connect: {
                        id: newTimeSlotId,
                    },
                },
            },
            include: {
                timeSlot: {
                    include: {
                        doctor: true,
                    },
                },
            },
        });
        const doctorBookings = await (0, get_booking_service_1.getDoctorBookings)(String(record.timeSlot.doctorId));
        const booking = { ...record };
        delete booking.timeSlot;
        return { doctorBookings, booking };
    }
    catch (err) {
        logger_1.logger.error(err);
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid time slot ID");
    }
}
//# sourceMappingURL=reschedule-booking.service.js.map