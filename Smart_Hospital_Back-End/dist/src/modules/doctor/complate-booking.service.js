"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.complateBooking = void 0;
const src_1 = require("src");
const app_error_1 = require("src/shared/app-error");
const complateBooking = async (bookingId, treatmentDetails) => {
    const booking = await src_1.db.booking.findUnique({
        where: { id: bookingId },
        include: { timeSlot: true }
    });
    if (!booking) {
        throw new app_error_1.AppError(404, "Booking not found");
    }
    await src_1.db.medicalRecord.create({
        data: {
            patientId: booking.patientId,
            doctorId: booking.timeSlot.doctorId,
            treatmentDetails: treatmentDetails
        },
    });
    await src_1.db.booking.delete({ where: { id: bookingId } });
};
exports.complateBooking = complateBooking;
//# sourceMappingURL=complate-booking.service.js.map