"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = void 0;
const http_status_codes_1 = require("http-status-codes");
const src_1 = require("src");
const app_error_1 = require("src/shared/app-error");
const getCategories = async () => {
    try {
        const categories = await src_1.db.category.findMany({
            include: {
                doctor: {
                    select: {
                        userId: true,
                        name: true,
                        email: true,
                        phone: true,
                        specializationShort: true,
                        specializationLong: true,
                        yearsofExperience: true,
                        awards: true,
                    },
                },
            },
        });
        return categories;
    }
    catch {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, "Unknown error; check the server logs");
    }
};
exports.getCategories = getCategories;
//# sourceMappingURL=get-category.service.js.map