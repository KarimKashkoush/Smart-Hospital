"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMedicalRecord = void 0;
const src_1 = require("src");
const medical_record_validation_1 = require("./medical-record.validation");
const app_error_1 = require("src/shared/app-error");
const createMedicalRecord = async (data) => {
    const validatedData = medical_record_validation_1.createMedicalRecordSchema.parse(data);
    const patientExists = await src_1.db.patient.findUnique({
        where: { userId: validatedData.patientId },
    });
    if (!patientExists)
        throw new app_error_1.AppError(404, "Patient not found");
    const doctorExists = await src_1.db.doctor.findUnique({
        where: { userId: validatedData.doctorId },
    });
    if (!doctorExists)
        throw new app_error_1.AppError(404, "Doctor not found");
    const medicalRecord = await src_1.db.medicalRecord.create({
        data: {
            patientId: validatedData.patientId,
            doctorId: validatedData.doctorId,
            diagnosis: validatedData.diagnosis,
            treatmentDetails: validatedData.treatmentDetails,
            datetime: new Date(),
        },
    });
    return medicalRecord;
};
exports.createMedicalRecord = createMedicalRecord;
//# sourceMappingURL=create-medical-record.service.js.map