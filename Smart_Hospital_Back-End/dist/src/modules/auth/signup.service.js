"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
const bcrypt_1 = require("bcrypt");
const src_1 = require("src");
const jsonwebtoken_1 = require("jsonwebtoken");
const env_1 = require("src/env");
const app_error_1 = require("src/shared/app-error");
const http_status_codes_1 = require("http-status-codes");
const signUp = async ({ password, username, gender, phone, birthDate, email, name, emergencyContactName, emergencyContactNumber, emergencyContactRelationship, medicalHistory = [], additionalNotes = "", university, }) => {
    const user = await src_1.db.user.findUnique({
        where: {
            username: username,
        },
    });
    if (user) {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "username is already in use");
    }
    const historyArray = Array.isArray(medicalHistory)
        ? medicalHistory
        : [medicalHistory];
    const createUser = await src_1.db.user.create({
        data: {
            username: username,
            passwordHash: (0, bcrypt_1.hashSync)(password, 10),
            patient: {
                create: {
                    email: email,
                    name: name,
                    gender: gender,
                    phone: phone,
                    birthDate: birthDate,
                    emergencyContactName: emergencyContactName,
                    emergencyContactNumber: emergencyContactNumber,
                    emergencyContactRelationship: emergencyContactRelationship,
                    medicalHistory: historyArray,
                    additionalNotes: additionalNotes,
                    university: university,
                },
            },
        },
        include: {
            patient: true,
        },
    });
    const token = jsonwebtoken_1.default.sign({
        id: createUser.id,
        username: createUser.username,
        role: createUser.role,
    }, env_1.env.JWT_SECRET);
    return {
        token,
        user: {
            ...createUser.patient,
            username: createUser.username,
            avatar: createUser.image,
        },
    };
};
exports.signUp = signUp;
//# sourceMappingURL=signup.service.js.map