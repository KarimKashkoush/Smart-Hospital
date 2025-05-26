"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLabReceptionistDetails = void 0;
const http_status_codes_1 = require("http-status-codes");
const src_1 = require("src");
const app_error_1 = require("src/shared/app-error");
const getLabReceptionistDetails = async (id) => {
    try {
        const receptionist = await src_1.db.labReceptionist.findFirst({
            where: {
                userId: Number(id),
            },
            include: {
                User: {
                    select: {
                        username: true,
                        image: true,
                        role: true,
                    },
                },
                supervisor: {
                    select: {
                        userId: true,
                        name: true,
                    },
                },
            },
        });
        if (!receptionist) {
            throw new app_error_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "Lab Receptionist not found");
        }
        return {
            id: receptionist.userId,
            name: receptionist.name,
            email: receptionist.email,
            phone: receptionist.phone,
            gender: receptionist.gender,
            birthDate: receptionist.birthDate,
            salary: receptionist.salary,
            bonus: receptionist.bonus,
            supervisor: receptionist.supervisor,
            username: receptionist.User?.username,
            avatar: receptionist.User?.image,
            role: receptionist.User?.role,
        };
    }
    catch {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid ID");
    }
};
exports.getLabReceptionistDetails = getLabReceptionistDetails;
//# sourceMappingURL=get-lab-receptionist.service.js.map