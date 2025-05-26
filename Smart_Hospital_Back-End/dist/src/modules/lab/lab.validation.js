"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLabTestSchema = exports.setLabReceptionistSalarySchema = exports.createLabReceptionistSchema = void 0;
const zod_1 = require("zod");
exports.createLabReceptionistSchema = zod_1.z.object({
    username: zod_1.z.string().min(1),
    name: zod_1.z.string().min(1),
    password: zod_1.z.string().min(8),
    phone: zod_1.z.string().min(10),
    email: zod_1.z.string().email(),
    gender: zod_1.z.enum(["male", "female"]),
    birthDate: zod_1.z.string(),
    supervisorDoctorId: zod_1.z.string(),
});
exports.setLabReceptionistSalarySchema = zod_1.z.object({
    id: zod_1.z.number(),
    salary: zod_1.z.number(),
    bonus: zod_1.z.number(),
});
exports.createLabTestSchema = zod_1.z.object({
    name: zod_1.z.string(),
    date: zod_1.z.string(),
    status: zod_1.z.enum(["pending", "completed"]).optional().default("pending"),
    referringDoctorId: zod_1.z.preprocess((val) => Number(val), zod_1.z.number()),
    patientUsername: zod_1.z.string(),
});
//# sourceMappingURL=lab.validation.js.map