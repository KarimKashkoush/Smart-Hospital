"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDoctor = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = require("bcryptjs");
const src_1 = require("src");
const app_error_1 = require("src/shared/app-error");
const createDoctor = async ({ username, password, name, categoryId, birthDate, yearsofExperience, education, awards, specializationLong, specializationShort, week, timeSlots, email, phone, }) => {
    const existDoctor = await src_1.db.user.findUnique({
        where: {
            username,
        },
    });
    if (existDoctor) {
        throw new app_error_1.AppError(400, "username is already in use");
    }
    const checkCategoryExists = (await src_1.db.category.count({ where: { id: categoryId } })) > 0;
    if (!checkCategoryExists) {
        throw new app_error_1.AppError(400, "Invalid category ID");
    }
    const doctor = await src_1.db.user.create({
        data: {
            username: username,
            passwordHash: (0, bcryptjs_1.hashSync)(password, 10),
            role: client_1.Role.doctor,
            doctor: {
                create: {
                    category: {
                        connect: {
                            id: categoryId,
                        },
                    },
                    name,
                    birthDate: birthDate,
                    yearsofExperience: yearsofExperience,
                    education: education,
                    awards: awards,
                    specializationLong: specializationLong,
                    specializationShort: specializationShort,
                    week: week,
                    phone: phone,
                    email: email,
                    timeSlots: {
                        createMany: {
                            data: timeSlots.map((slot) => ({
                                dayOfWeek: slot.dayOfWeek,
                                shift: slot.shift,
                                startTime: slot.startTime,
                                endTime: slot.endTime,
                            })),
                        },
                    },
                },
            },
        },
        include: {
            doctor: {
                include: {
                    timeSlots: true,
                },
            },
        },
    });
    return { ...doctor.doctor, username: doctor.username, avatar: doctor.image };
};
exports.createDoctor = createDoctor;
//# sourceMappingURL=create-doctor.service.js.map