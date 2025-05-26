"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLabReceptionistSalary = setLabReceptionistSalary;
const http_status_codes_1 = require("http-status-codes");
const src_1 = require("src");
const app_error_1 = require("src/shared/app-error");
async function setLabReceptionistSalary({ id, salary, bonus, }) {
    const doesExists = (await src_1.db.labReceptionist.count({ where: { userId: +id } })) > 0;
    if (!doesExists) {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "Lab receptionist was not found");
    }
    const labReceptionist = await src_1.db.labReceptionist.update({
        where: {
            userId: +id,
        },
        data: {
            salary,
            bonus,
        },
    });
    return labReceptionist;
}
//# sourceMappingURL=set-lab-receptionist-salary.service.js.map