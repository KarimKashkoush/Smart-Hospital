"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDoctor = void 0;
const http_status_codes_1 = require("http-status-codes");
const src_1 = require("src");
const app_error_1 = require("src/shared/app-error");
const deleteDoctor = async (id) => {
    try {
        const doctor = await src_1.db.user.findFirst({
            where: {
                id: +id,
            },
        });
        if (!doctor) {
            throw new app_error_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "Doctor was not found");
        }
        await src_1.db.timeSlots.deleteMany({
            where: {
                doctorId: doctor.id,
            },
        });
        const user = await src_1.db.user.delete({
            where: {
                id: +id,
            },
            include: {
                doctor: true,
            },
        });
        return user.doctor;
    }
    catch (error) {
        console.error("Delete error:", error);
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid ID");
    }
};
exports.deleteDoctor = deleteDoctor;
//# sourceMappingURL=delete-doctor.service.js.map