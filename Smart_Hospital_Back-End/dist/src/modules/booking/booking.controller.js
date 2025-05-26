"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booking_service_1 = require("./booking.service");
const http_status_codes_1 = require("http-status-codes");
const express_async_handler_1 = require("express-async-handler");
const validate_body_1 = require("src/shared/validate-body");
const booking_validation_1 = require("./booking.validation");
const get_booking_service_1 = require("./get-booking.service");
const delete_booking_service_1 = require("./delete-booking.service");
const reschedule_booking_service_1 = require("./reschedule-booking.service");
const get_bookings_service_1 = require("./get-bookings.service");
const client_1 = require("@prisma/client");
const bookingRouter = express_1.default.Router();
bookingRouter.post("/create-booking", (0, validate_body_1.validateBody)(booking_validation_1.createBookingSchema), (0, express_async_handler_1.default)(async (req, res) => {
    try {
        const booking = await (0, booking_service_1.createBooking)(req.body);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ booking, message: "تم الحجز بنجاح" });
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                message: "يوجد حجز بالفعل في نفس الموعد، برجاء اختيار وقت مختلف.",
            });
        }
        else {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "حدث خطأ أثناء محاولة الحجز. برجاء المحاولة لاحقًا.",
            });
        }
    }
}));
bookingRouter.get("/get-booking", (0, express_async_handler_1.default)(async (req, res) => {
    const booking = await (0, get_bookings_service_1.getBookings)();
    res.status(http_status_codes_1.StatusCodes.OK).json({ booking, message: "Successful" });
}));
bookingRouter.get("/get-doctor-bookings/:id", (0, express_async_handler_1.default)(async (req, res) => {
    const booking = await (0, get_booking_service_1.getDoctorBookings)(req.params.id);
    res.status(http_status_codes_1.StatusCodes.OK).json({ booking, message: "Successful" });
}));
bookingRouter.post("/reschedule-booking", (0, validate_body_1.validateBody)(booking_validation_1.rescheduleBookingSchema), (0, express_async_handler_1.default)(async (req, res) => {
    const { doctorBookings, booking } = await (0, reschedule_booking_service_1.rescheduleBooking)(req.body.bookingId, req.body.newTimeSlotId, req.body.date);
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ doctorBookings, booking, message: "Successful" });
}));
bookingRouter.delete("/delete-booking/:id", (0, express_async_handler_1.default)(async (req, res) => {
    const booking = await (0, delete_booking_service_1.deleteBooking)(req.params.id);
    res.status(http_status_codes_1.StatusCodes.OK).json({ booking, message: "Successful" });
}));
exports.default = bookingRouter;
//# sourceMappingURL=booking.controller.js.map