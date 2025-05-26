"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDoctorMedicalExcuses = getDoctorMedicalExcuses;
const http_status_codes_1 = require("http-status-codes");
const src_1 = require("src");
const app_error_1 = require("src/shared/app-error");
async function getDoctorMedicalExcuses(doctorId) {
    if (isNaN(doctorId)) {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_GATEWAY, "Invalid doctor ID");
    }
    const checkDoctorExists = (await src_1.db.doctor.count({ where: { userId: doctorId } })) > 0;
    if (!checkDoctorExists) {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "Invalid doctor ID");
    }
    return await src_1.db.medicalExcuse.findMany({ where: { doctorId } });
}
//# sourceMappingURL=get-doctor-excuse.service.js.map