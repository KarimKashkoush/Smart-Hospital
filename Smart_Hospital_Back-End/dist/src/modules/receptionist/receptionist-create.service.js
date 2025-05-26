"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReceptionist = void 0;
const bcryptjs_1 = require("bcryptjs");
const http_status_codes_1 = require("http-status-codes");
const src_1 = require("src");
const app_error_1 = require("src/shared/app-error");
const client_1 = require("@prisma/client");
const createReceptionist = async ({ username, name, password, phone, email, department, gender, }, image) => {
    const exist = await src_1.db.user.findUnique({
        where: {
            username: username,
        },
    });
    if (exist) {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Receptionist already exists");
    }
    const imagePath = image ? "/" + image.filename : null;
    const receptionist = await src_1.db.user.create({
        data: {
            username: username,
            passwordHash: (0, bcryptjs_1.hashSync)(password, 10),
            image: imagePath,
            role: client_1.Role.receptionist,
            receptionist: {
                create: {
                    name: name,
                    gender: gender,
                    email: email,
                    phone: phone,
                    department: department,
                },
            },
        },
    });
    return {
        ...receptionist,
        username: receptionist.username,
        avatar: receptionist.image,
    };
};
exports.createReceptionist = createReceptionist;
//# sourceMappingURL=receptionist-create.service.js.map