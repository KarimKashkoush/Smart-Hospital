"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicalExcuseRouter = void 0;
const express_1 = require("express");
const express_async_handler_1 = require("express-async-handler");
const http_status_codes_1 = require("http-status-codes");
const validate_body_1 = require("src/shared/validate-body");
const excuse_validation_1 = require("./excuse.validation");
const validate_files_1 = require("src/shared/validate-files");
const create_excuse_service_1 = require("./create-excuse.service");
const checkRoles_1 = require("src/shared/middlewares/checkRoles");
const get_patient_excuses_service_1 = require("./get-patient-excuses.service");
const get_doctor_excuse_service_1 = require("./get-doctor-excuse.service");
const set_excuse_approval_service_1 = require("./set-excuse-approval.service");
const update_excuse_service_1 = require("./update-excuse.service");
const delete_excuse_service_1 = require("./delete-excuse.service");
const zod_1 = require("zod");
exports.medicalExcuseRouter = (0, express_1.Router)();
exports.medicalExcuseRouter.post("/create-medical-excuse", (0, checkRoles_1.checkRoles)(["patient"]), (0, validate_files_1.validateFiles)({
    attachment: {
        required: false,
        mimeTypes: [
            "application/pdf",
            "image/jpg",
            "image/png",
            "image/jpeg",
            "application/docs",
        ],
    },
}), (0, validate_body_1.validateBody)(excuse_validation_1.createMedicalExcuseSchema), (0, express_async_handler_1.default)(async (req, res) => {
    const medicalExcuse = await (0, create_excuse_service_1.createMedicalExcuse)({
        ...req.body,
        attachment: req.files?.["attachment"]?.[0],
    });
    res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json({ medicalExcuse, message: "Successful" });
}));
exports.medicalExcuseRouter.get("/get-patient-medical-excuses/:id", (0, checkRoles_1.checkRoles)(["patient"]), (0, express_async_handler_1.default)(async (req, res) => {
    const medicalExcuses = await (0, get_patient_excuses_service_1.getPatientMedicalExcuses)(+req.params.id);
    res.status(http_status_codes_1.StatusCodes.OK).json({ medicalExcuses, message: "Successful" });
}));
exports.medicalExcuseRouter.get("/get-doctor-medical-excuses/:id", (0, checkRoles_1.checkRoles)(["doctor"]), (0, express_async_handler_1.default)(async (req, res) => {
    const medicalExcuses = await (0, get_doctor_excuse_service_1.getDoctorMedicalExcuses)(+req.params.id);
    res.status(http_status_codes_1.StatusCodes.OK).json({ medicalExcuses, message: "Successful" });
}));
exports.medicalExcuseRouter.post("/set-medical-excuse-approval/:id", (0, checkRoles_1.checkRoles)(["doctor"]), (0, validate_body_1.validateBody)(zod_1.z.object({ status: zod_1.z.enum(["approved", "rejected"]) })), (0, express_async_handler_1.default)(async (req, res) => {
    const medicalExcuse = await (0, set_excuse_approval_service_1.setMedicalExcuseApproval)(+req.params.id, req.body.status);
    res.status(http_status_codes_1.StatusCodes.OK).json({ medicalExcuse, message: "Successful" });
}));
exports.medicalExcuseRouter.patch("/update-medical-excuse/:id", (0, checkRoles_1.checkRoles)(["patient", "doctor"]), (0, validate_body_1.validateBody)(excuse_validation_1.updateMedicalExcuseSchema), (0, validate_files_1.validateFiles)({
    attachment: {
        required: false,
        mimeTypes: [
            "application/pdf",
            "image/jpg",
            "image/png",
            "image/jpeg",
            "application/docs",
        ],
    },
}), (0, express_async_handler_1.default)(async (req, res) => {
    const medicalExcuse = await (0, update_excuse_service_1.updateMedicalExcuse)(+req.params.id, {
        ...req.body,
        attachment: req.files?.["attachment"]?.[0],
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ medicalExcuse, message: "Successful" });
}));
exports.medicalExcuseRouter.delete("/delete-medical-excuse/:id", (0, checkRoles_1.checkRoles)(["patient", "doctor"]), (0, express_async_handler_1.default)(async (req, res) => {
    const medicalExcuse = await (0, delete_excuse_service_1.deleteMedicalExcuse)(+req.params.id);
    res.status(http_status_codes_1.StatusCodes.OK).json({ medicalExcuse, message: "Successful" });
}));
//# sourceMappingURL=excuse.controller.js.map