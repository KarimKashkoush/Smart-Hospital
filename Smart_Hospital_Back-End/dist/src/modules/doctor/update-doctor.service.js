"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDoctor = void 0;
const bcrypt_1 = require("bcrypt");
const http_status_codes_1 = require("http-status-codes");
const src_1 = require("src");
const app_error_1 = require("src/shared/app-error");
const updateDoctor = async (id, data) => {
    const doctorId = Number(id);
    if (isNaN(doctorId)) {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid doctor ID");
    }
    const doctor = await src_1.db.doctor.findUnique({
        where: { userId: doctorId },
    });
    if (!doctor) {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "Doctor was not found");
    }
    const updateData = {};
    if (data.username !== undefined)
        updateData.username = data.username;
    if (data.password !== undefined)
        updateData.passwordHash = (0, bcrypt_1.hashSync)(data.password, 10);
    if (data.birthDate !== undefined)
        updateData.birthDate = data.birthDate;
    if (data.yearsofExperience !== undefined)
        updateData.yearsofExperience = data.yearsofExperience;
    if (data.specializationLong !== undefined)
        updateData.specializationLong = data.specializationLong;
    if (data.specializationShort !== undefined)
        updateData.specializationShort = data.specializationShort;
    if (data.education !== undefined)
        updateData.education = data.education;
    if (data.awards !== undefined)
        updateData.awards = data.awards;
    if (data.week !== undefined)
        updateData.week = data.week;
    if (data.name !== undefined)
        updateData.name = data.name;
    if (data.profileImage !== undefined)
        updateData.profileImage = data.profileImage;
    if (data.phone !== undefined)
        updateData.phone = data.phone;
    if (data.email !== undefined)
        updateData.email = data.email;
    const updatedDoctor = await src_1.db.doctor.update({
        where: { userId: doctorId },
        data: updateData,
    });
    return updatedDoctor;
};
exports.updateDoctor = updateDoctor;
//# sourceMappingURL=update-doctor.service.js.map