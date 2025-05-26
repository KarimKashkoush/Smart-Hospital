"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMedicalExcuseApproval = setMedicalExcuseApproval;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const src_1 = require("src");
const app_error_1 = require("src/shared/app-error");
async function setMedicalExcuseApproval(medicalExcuseId, status) {
    const checkMedicalExcuseExists = (await src_1.db.medicalExcuse.count({ where: { id: medicalExcuseId } })) > 0;
    if (!checkMedicalExcuseExists) {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "Invalid medical excuse ID");
    }
    const medicalExcuse = await src_1.db.medicalExcuse.update({
        where: { id: medicalExcuseId },
        data: {
            status: status === "approved"
                ? client_1.ExcuseStatus.approved
                : status === "rejected"
                    ? client_1.ExcuseStatus.rejected
                    : client_1.ExcuseStatus.pending,
        },
    });
    return medicalExcuse;
}
//# sourceMappingURL=set-excuse-approval.service.js.map