"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_timeslots_service_1 = require("./create-timeslots.service");
const express_async_handler_1 = require("express-async-handler");
const http_status_codes_1 = require("http-status-codes");
const get_time_slots_service_1 = require("./get-time-slots.service");
const update_service_1 = require("./update.service");
const delete_service_1 = require("./delete.service");
const validate_body_1 = require("src/shared/validate-body");
const timeslot_validation_1 = require("./timeslot.validation");
const timeSlotsRouter = (0, express_1.Router)();
timeSlotsRouter.post("/create-timeslots", (0, express_async_handler_1.default)(async (req, res) => {
    const timeSlots = await (0, create_timeslots_service_1.createTimeslots)(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ timeSlots, message: "Successful" });
}));
timeSlotsRouter.get("/get-timeslots", (0, express_async_handler_1.default)(async (req, res) => {
    const timeSlots = await (0, get_time_slots_service_1.getAllTimeSlots)();
    res.status(http_status_codes_1.StatusCodes.OK).json({ timeSlots, message: "Successful" });
}));
timeSlotsRouter.get("/get-timeslot/:id", (0, express_async_handler_1.default)(async (req, res) => {
    const timeSlots = await (0, get_time_slots_service_1.getOneTimeSlot)(req.params.id);
    res.status(http_status_codes_1.StatusCodes.OK).json({ timeSlots, message: "Successful" });
}));
timeSlotsRouter.patch("/update-timeslots/:id", (0, validate_body_1.validateBody)(timeslot_validation_1.updateTimeSlotSchema), (0, express_async_handler_1.default)(async (req, res) => {
    const timeSlots = await (0, update_service_1.updateTimeSlot)(req.params.id, req.body);
    res.status(http_status_codes_1.StatusCodes.OK).json({ timeSlots, message: "Successful" });
}));
timeSlotsRouter.delete("/delete-timeslots/:id", (0, express_async_handler_1.default)(async (req, res) => {
    const timeSlots = await (0, delete_service_1.deleteTimeSlot)(req.params.id);
    res.status(http_status_codes_1.StatusCodes.OK).json({ timeSlots, message: "Successful" });
}));
exports.default = timeSlotsRouter;
//# sourceMappingURL=timeslots.controller.js.map