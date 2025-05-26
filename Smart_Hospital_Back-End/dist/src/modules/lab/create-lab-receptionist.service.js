"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLabReceptionist = void 0;
const bcryptjs_1 = require("bcryptjs");
const src_1 = require("src");
const app_error_1 = require("src/shared/app-error");
const client_1 = require("@prisma/client");
const createLabReceptionist = async ({ username, name, password, phone, email, gender, birthDate, supervisorDoctorId, }) => {
    const checkSupervisorExists = (await src_1.db.doctor.count({
        where: { userId: Number(supervisorDoctorId) },
    })) > 0;
    if (!checkSupervisorExists) {
        throw new app_error_1.AppError(400, "Invalid Supervisor ID");
    }
    const labReceptionist = await src_1.db.user.create({
        data: {
            username,
            passwordHash: (0, bcryptjs_1.hashSync)(password, 10),
            role: client_1.Role.lab,
            labReceptionist: {
                create: {
                    name,
                    email,
                    phone,
                    gender,
                    birthDate,
                    supervisorId: Number(supervisorDoctorId),
                },
            },
        },
        include: {
            labReceptionist: true,
        },
    });
    return {
        ...labReceptionist.labReceptionist,
        username: labReceptionist.username,
        avatar: labReceptionist.image,
    };
};
exports.createLabReceptionist = createLabReceptionist;
//# sourceMappingURL=create-lab-receptionist.service.js.map