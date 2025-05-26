"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_async_handler_1 = require("express-async-handler");
const validate_body_1 = require("src/shared/validate-body");
const doctor_validation_1 = require("./doctor.validation");
const http_status_codes_1 = require("http-status-codes");
const checkRoles_1 = require("src/shared/middlewares/checkRoles");
const create_doctor_service_1 = require("./create-doctor.service");
const get_doctor_service_1 = require("./get-doctor.service");
const update_doctor_service_1 = require("./update-doctor.service");
const delete_doctor_service_1 = require("./delete-doctor.service");
const validate_files_1 = require("src/shared/validate-files");
const doctorRouter = (0, express_1.Router)();
doctorRouter.post("/create-doctor", (0, validate_body_1.validateBody)(doctor_validation_1.createDoctorSchema), (0, express_async_handler_1.default)(async (req, res) => {
    const doctor = await (0, create_doctor_service_1.createDoctor)(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ doctor, message: "Successful" });
}));
doctorRouter.get("/doctors", (0, express_async_handler_1.default)(async (req, res) => {
    const doctors = await (0, get_doctor_service_1.getDoctors)();
    res.status(http_status_codes_1.StatusCodes.OK).json({ doctors, message: "Successful" });
}));
doctorRouter.get("/get-doctor/:id", (0, express_async_handler_1.default)(async (req, res) => {
    const doctor = await (0, get_doctor_service_1.getDoctorDetails)(req.params.id);
    res.status(http_status_codes_1.StatusCodes.OK).json({ doctor, message: "Successful" });
}));
doctorRouter.patch("/update-doctor/:id", (0, checkRoles_1.checkRoles)(["admin", "doctor"]), (0, validate_files_1.validateFiles)({
    profileImage: {
        required: false,
        mimeTypes: ["image/jpg", "image/png", "image/jpeg"],
    },
}), (0, express_async_handler_1.default)(async (req, res) => {
    const doctor = await (0, update_doctor_service_1.updateDoctor)(req.params.id, req.body);
    res.status(http_status_codes_1.StatusCodes.OK).json({ doctor, message: "Successful" });
}));
doctorRouter.delete("/delete-doctor/:id", (0, checkRoles_1.checkRoles)(["admin", "doctor"]), (0, express_async_handler_1.default)(async (req, res) => {
    const doctor = await (0, delete_doctor_service_1.deleteDoctor)(req.params.id);
    res.status(http_status_codes_1.StatusCodes.OK).json({ doctor, message: "Successful" });
}));
exports.default = doctorRouter;
//# sourceMappingURL=doctor.controller.js.map