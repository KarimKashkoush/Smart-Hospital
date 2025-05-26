"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_medical_record_service_1 = require("./create-medical-record.service");
const get_medical_records_service_1 = require("./get-medical-records.service");
const validate_body_1 = require("src/shared/validate-body");
const http_status_codes_1 = require("http-status-codes");
const checkRoles_1 = require("src/shared/middlewares/checkRoles");
const medical_record_validation_1 = require("./medical-record.validation");
const zod_1 = require("zod");
const medicalRecordRouter = (0, express_1.Router)();
medicalRecordRouter.post("/create-medical-record", (0, checkRoles_1.checkRoles)(["doctor", "admin"]), (0, validate_body_1.validateBody)(medical_record_validation_1.createMedicalRecordSchema), async (req, res) => {
    try {
        const medicalRecord = await (0, create_medical_record_service_1.createMedicalRecord)(req.body);
        res.status(http_status_codes_1.StatusCodes.CREATED).json(medicalRecord);
    }
    catch (error) {
        console.error("Error in create-medical-record:", error);
        if (error instanceof zod_1.z.ZodError) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                message: "Validation error",
                errors: error.errors,
            });
        }
        else {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Internal server error",
            });
        }
    }
});
medicalRecordRouter.get("/medical-records", async (_req, res) => {
    try {
        const records = await (0, get_medical_records_service_1.getMedicalRecords)();
        res.status(http_status_codes_1.StatusCodes.OK).json(records);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "Unknown Error" });
        }
    }
});
exports.default = medicalRecordRouter;
//# sourceMappingURL=medical-record.controller.js.map