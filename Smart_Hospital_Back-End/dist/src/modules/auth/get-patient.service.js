"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPatientById = void 0;
const src_1 = require("src");
const app_error_1 = require("src/shared/app-error");
const http_status_codes_1 = require("http-status-codes");
const getPatientById = async (id) => {
    const userId = Number(id);
    if (isNaN(userId)) {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid ID");
    }
    const patient = await src_1.db.patient.findUnique({
        where: { userId },
        include: {
            user: {
                select: {
                    username: true,
                    image: true,
                },
            },
            MedicalExcuse: true,
            medicalRecord: true,
            LabTest: true,
        },
    });
    if (!patient) {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "Patient not found");
    }
    return {
        ...patient,
        username: patient.user?.username ?? null,
        avatar: patient.user?.image ?? null,
    };
};
exports.getPatientById = getPatientById;
//# sourceMappingURL=get-patient.service.js.map