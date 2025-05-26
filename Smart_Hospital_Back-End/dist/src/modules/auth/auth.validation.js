"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInSchema = exports.signUpSchema = void 0;
const zod_1 = require("zod");
exports.signUpSchema = zod_1.z.object({
    username: zod_1.z.string(),
    email: zod_1.z.string().email("Invalid email"),
    name: zod_1.z.string(),
    gender: zod_1.z.enum(["male", "female"]),
    phone: zod_1.z.string(),
    birthDate: zod_1.z.string(),
    password: zod_1.z
        .string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, {
        message: "Password must at least be 8 letters long, contain at least one uppercase character, one lowercase character, and one special character.",
    })
        .min(8, "Password is required"),
    emergencyContactName: zod_1.z.string(),
    emergencyContactRelationship: zod_1.z.string(),
    emergencyContactNumber: zod_1.z.string(),
    medicalHistory: zod_1.z.string().array(),
    additionalNotes: zod_1.z.string(),
    university: zod_1.z.string(),
});
exports.signInSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string().min(8),
});
//# sourceMappingURL=auth.validation.js.map