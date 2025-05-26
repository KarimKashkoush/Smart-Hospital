"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLabTestStatus = setLabTestStatus;
const http_status_codes_1 = require("http-status-codes");
const src_1 = require("src");
const app_error_1 = require("src/shared/app-error");
async function setLabTestStatus({ id, status, }) {
    const checkTestExists = (await src_1.db.labTest.count({ where: { id } })) > 0;
    if (!checkTestExists) {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid lab test ID");
    }
    const labTest = await src_1.db.labTest.update({
        where: { id },
        data: {
            status,
        },
    });
    return labTest;
}
//# sourceMappingURL=set-lab-test-status.service.js.map