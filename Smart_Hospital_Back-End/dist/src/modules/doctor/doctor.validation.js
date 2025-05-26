"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.complateBookingSchema = exports.excuseUpdateSchema = exports.labTestSchema = exports.createDoctorSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const timeslot_validation_1 = require("../timeslots/timeslot.validation");
exports.createDoctorSchema = zod_1.default.object({
    username: zod_1.default.string().min(3),
    password: zod_1.default.string().min(6),
    birthDate: zod_1.default.string(),
    yearsofExperience: zod_1.default.string(),
    specializationLong: zod_1.default.string(),
    specializationShort: zod_1.default.string(),
    education: zod_1.default.string(),
    awards: zod_1.default.string(),
    week: zod_1.default.array(zod_1.default.nativeEnum(client_1.Week)).min(1, "You must select at least one day"),
    timeSlots: zod_1.default.array(timeslot_validation_1.createTimeSlotSchema),
    categoryId: zod_1.default.number(),
    name: zod_1.default.string(),
    phone: zod_1.default.string(),
    email: zod_1.default.string().email(),
});
exports.labTestSchema = zod_1.default.object({
    patientId: zod_1.default.number(),
    testname: zod_1.default.string().min(1),
});
exports.excuseUpdateSchema = zod_1.default.object({
    patientId: zod_1.default.number(),
    status: zod_1.default.enum(["approved", "rejected"]),
});
exports.complateBookingSchema = zod_1.default.object({
    treatmentDetails: zod_1.default.string(),
});
//# sourceMappingURL=doctor.validation.js.map