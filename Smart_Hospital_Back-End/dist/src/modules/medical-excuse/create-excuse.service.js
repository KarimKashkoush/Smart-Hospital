"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMedicalExcuse = createMedicalExcuse;
const src_1 = require("src");
const app_error_1 = require("src/shared/app-error");
const http_status_codes_1 = require("http-status-codes");
async function createMedicalExcuse({ reason, endDate, doctorId, startDate, attachment, patientId, fullName, email, categoryId, }) {
    const attachmentFile = "/" + attachment?.filename;
    const doctorIdNum = Number(doctorId);
    const patientIdNum = Number(patientId);
    const doctor = (await src_1.db.doctor.count({ where: { userId: doctorIdNum } })) > 0;
    if (!doctor) {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "Invalid doctor ID");
    }
    const patient = (await src_1.db.patient.count({ where: { userId: patientIdNum } })) > 0;
    if (!patient) {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "Invalid patient ID");
    }
    const medicalExcuse = await src_1.db.medicalExcuse.create({
        data: {
            patient: { connect: { userId: patientIdNum } },
            doctor: { connect: { userId: doctorIdNum } },
            category: { connect: { id: Number(categoryId) } },
            reason,
            endDate,
            startDate,
            fullName,
            email,
            status: "Pending",
            rejectionReason: "",
            ...(attachment ? { image: attachmentFile } : {}),
        },
    });
    return medicalExcuse;
}
//# sourceMappingURL=create-excuse.service.js.map