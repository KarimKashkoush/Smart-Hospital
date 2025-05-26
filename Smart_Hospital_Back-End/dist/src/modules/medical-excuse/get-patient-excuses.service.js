"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPatientMedicalExcuses = getPatientMedicalExcuses;
const http_status_codes_1 = require("http-status-codes");
const src_1 = require("src");
const app_error_1 = require("src/shared/app-error");
async function getPatientMedicalExcuses(patientId) {
    if (isNaN(patientId)) {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid patient ID");
    }
    const checkPatientExists = (await src_1.db.patient.count({ where: { userId: patientId } })) > 0;
    if (!checkPatientExists) {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "Invalid patient ID");
    }
    return await src_1.db.medicalExcuse.findMany({ where: { patientId } });
}
//# sourceMappingURL=get-patient-excuses.service.js.map