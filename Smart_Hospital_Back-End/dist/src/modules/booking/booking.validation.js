"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rescheduleBookingSchema = exports.updateBookingSchema = exports.createBookingSchema = void 0;
const zod_1 = require("zod");
exports.createBookingSchema = zod_1.z.object({
    patientId: zod_1.z.number().int(),
    timeSlotId: zod_1.z.number().int(),
    dateTime: zod_1.z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "Invalid date-time format",
    }),
    patientName: zod_1.z.string(),
});
exports.updateBookingSchema = zod_1.z.object({
    bookingId: zod_1.z.number(),
    status: zod_1.z.string().optional(),
    timeSlotId: zod_1.z.number().optional(),
    date: zod_1.z.string().optional().refine(val => !val || !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    }),
    patientName: zod_1.z.string().optional(),
});
exports.rescheduleBookingSchema = zod_1.z.object({
    bookingId: zod_1.z.number(),
    newTimeSlotId: zod_1.z.number(),
    date: zod_1.z.string(),
});
//# sourceMappingURL=booking.validation.js.map