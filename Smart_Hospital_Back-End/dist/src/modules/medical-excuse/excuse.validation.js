"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMedicalExcuseSchema = exports.createMedicalExcuseSchema = void 0;
const zod_1 = require("zod");
exports.createMedicalExcuseSchema = zod_1.z.object({
    reason: zod_1.z.string(),
    endDate: zod_1.z.string().refine(val => !isNaN(Date.parse(val)), { message: "Invalid date" }),
    startDate: zod_1.z.string().refine(val => !isNaN(Date.parse(val)), { message: "Invalid date" }),
    doctorId: zod_1.z.string().transform(val => Number(val)),
    patientId: zod_1.z.string().transform(val => Number(val)),
    categoryId: zod_1.z.string().transform(val => Number(val)),
    fullName: zod_1.z.string(),
    email: zod_1.z.string().email(),
    rejectionReason: zod_1.z.string().optional().default(""),
});
exports.updateMedicalExcuseSchema = zod_1.z.object({
    patientId: zod_1.z.coerce.number().int().optional(),
    startDate: zod_1.z.string().datetime().optional(),
    endDate: zod_1.z.string().datetime().optional(),
    reason: zod_1.z.string().optional(),
    doctorId: zod_1.z.coerce.number().int().optional(),
    rejectionReason: zod_1.z.string().optional(),
});
//# sourceMappingURL=excuse.validation.js.map