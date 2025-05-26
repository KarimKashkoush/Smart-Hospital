"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = void 0;
const bcrypt_1 = require("bcrypt");
const src_1 = require("src");
const jose_1 = require("jose");
const env_1 = require("src/env");
const app_error_1 = require("src/shared/app-error");
const http_status_codes_1 = require("http-status-codes");
const signIn = async ({ username, password, }) => {
    const user = await src_1.db.user.findFirst({
        where: {
            username: username,
        },
    });
    if (!user) {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "username or password is incorrect");
    }
    if (!(0, bcrypt_1.compareSync)(password, user.passwordHash)) {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "username or password is incorrect");
    }
    const secret = new TextEncoder().encode(env_1.env.JWT_SECRET);
    const token = await new jose_1.SignJWT({ id: user.id, role: user.role })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1d")
        .sign(secret);
    const isAdmin = user.role === "admin";
    const isReceptionist = user.role === "receptionist";
    const isLabReceptionist = user.role === "lab";
    const isDoctor = user.role === "doctor";
    const isPatient = user.role === "patient";
    let userRecord = {};
    if (isAdmin || isReceptionist) {
        const receptionist = await src_1.db.receptionist.findUnique({
            where: { userId: user.id },
        });
        userRecord = receptionist;
    }
    else if (isLabReceptionist) {
        const labReceptionist = await src_1.db.labReceptionist.findUnique({
            where: { userId: user.id },
        });
        userRecord = labReceptionist;
    }
    else if (isDoctor) {
        const doctor = await src_1.db.doctor.findUnique({
            where: { userId: user.id },
        });
        userRecord = doctor;
    }
    else if (isPatient) {
        const patient = await src_1.db.patient.findUnique({
            where: { userId: user.id },
        });
        userRecord = patient;
    }
    userRecord.username = user.username;
    userRecord.avatar = user.image;
    userRecord.role = user.role;
    return { token, user: userRecord };
};
exports.signIn = signIn;
//# sourceMappingURL=signin.service.js.map