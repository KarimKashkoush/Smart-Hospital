"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMedicalRecordSchema = void 0;
const zod_1 = require("zod");
exports.createMedicalRecordSchema = zod_1.z.object({
    doctorId: zod_1.z.number(),
    patientId: zod_1.z.number(),
    diagnosis: zod_1.z.string().optional(),
    treatmentDetails: zod_1.z.string().optional(),
});
//# sourceMappingURL=medical-record.validation.js.map