"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMedicalExcuse = deleteMedicalExcuse;
const http_status_codes_1 = require("http-status-codes");
const src_1 = require("src");
const app_error_1 = require("src/shared/app-error");
async function deleteMedicalExcuse(medicalExcuseId) {
    const checkMedicalExcuseExists = (await src_1.db.medicalExcuse.count({ where: { id: medicalExcuseId } })) > 0;
    if (!checkMedicalExcuseExists) {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "Invalid medical excuse ID");
    }
    const deletedRecord = await src_1.db.medicalExcuse.delete({
        where: { id: medicalExcuseId },
    });
    return deletedRecord;
}
//# sourceMappingURL=delete-excuse.service.js.map