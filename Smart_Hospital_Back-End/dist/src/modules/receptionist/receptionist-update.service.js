"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReceptionist = void 0;
const http_status_codes_1 = require("http-status-codes");
const src_1 = require("src");
const app_error_1 = require("src/shared/app-error");
const updateReceptionist = async (id, data, image) => {
    const findReceptionist = await src_1.db.receptionist.findFirst({
        where: {
            userId: +id,
        },
    });
    if (!findReceptionist) {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "Receptionist was not found");
    }
    const receptionist = await src_1.db.user.update({
        where: {
            id: +id,
        },
        data: {
            ...(data.username ? { username: data.username } : {}),
            ...(data.passwordHash ? { passwordHash: data.passwordHash } : {}),
            ...(image ? { image: image.filename } : {}),
        },
    });
    const updateReceptionist = await src_1.db.receptionist.update({
        where: {
            userId: +id,
        },
        data: {
            ...(data.email ? { email: data.email } : {}),
            ...(data.gender ? { gender: data.gender } : {}),
            ...(data.phone ? { phone: data.phone } : {}),
            ...(data.name ? { name: data.name } : {}),
        },
    });
    return { updateReceptionist };
};
exports.updateReceptionist = updateReceptionist;
//# sourceMappingURL=receptionist-update.service.js.map