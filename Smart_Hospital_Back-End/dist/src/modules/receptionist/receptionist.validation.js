"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReceptionistSchema = exports.createReceptionistSchema = void 0;
const zod_1 = require("zod");
exports.createReceptionistSchema = zod_1.z.object({
    username: zod_1.z.string(),
    name: zod_1.z.string().optional(),
    password: zod_1.z.string(),
    phone: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
    department: zod_1.z.string().optional(),
    gender: zod_1.z.enum(["male", "female"]).optional(),
});
exports.updateReceptionistSchema = zod_1.z.object({
    username: zod_1.z.string().optional(),
    password: zod_1.z.string().optional(),
    name: zod_1.z.string().optional(),
    gender: zod_1.z.enum(["male", "female"]).optional(),
    email: zod_1.z.string().email().optional(),
    phone: zod_1.z.string().optional(),
    image: zod_1.z.string().optional(),
});
//# sourceMappingURL=receptionist.validation.js.map