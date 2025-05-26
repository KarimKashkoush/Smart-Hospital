"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMedicalExcuse = updateMedicalExcuse;
const src_1 = require("src");
async function updateMedicalExcuse(medicalExcuseId, { doctorId, patientId, reason, endDate, startDate, attachment, status, rejectionReason, }) {
    const attachmentFile = attachment ? "/" + attachment.filename : undefined;
    const updatedRecord = await src_1.db.medicalExcuse.update({
        data: {
            ...(doctorId ? { doctor: { connect: { userId: doctorId } } } : {}),
            ...(patientId ? { patient: { connect: { userId: patientId } } } : {}),
            ...(reason ? { reason } : {}),
            ...(startDate ? { startDate } : {}),
            ...(endDate ? { endDate } : {}),
            ...(attachmentFile ? { image: attachmentFile } : {}),
            ...(status ? { status } : {}),
            ...(rejectionReason ? { rejectionReason } : {}),
        },
        where: { id: medicalExcuseId },
    });
    return updatedRecord;
}
//# sourceMappingURL=update-excuse.service.js.map