"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryDoctors = getCategoryDoctors;
const http_status_codes_1 = require("http-status-codes");
const src_1 = require("src");
const app_error_1 = require("src/shared/app-error");
async function getCategoryDoctors(id) {
    try {
        const doctors = await src_1.db.doctor.findMany({
            where: {
                categoryId: +id,
            },
        });
        return doctors;
    }
    catch {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Ensure the ID is valid");
    }
}
//# sourceMappingURL=get-category-doctors.service.js.map