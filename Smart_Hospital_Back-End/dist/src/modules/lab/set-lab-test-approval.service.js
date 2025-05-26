"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLabTestApproval = setLabTestApproval;
const http_status_codes_1 = require("http-status-codes");
const src_1 = require("src");
const app_error_1 = require("src/shared/app-error");
async function setLabTestApproval({ id, accepted, }) {
    const checkTestExists = (await src_1.db.labTest.count({ where: { id } })) > 0;
    if (!checkTestExists)
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid lab test ID");
    if (accepted === true) {
        const labTest = await src_1.db.labTest.update({
            where: { id },
            data: { accepted: true },
        });
        return labTest;
    }
    await src_1.db.labTest.delete({
        where: { id },
    });
    return null;
}
//# sourceMappingURL=set-lab-test-approval.service.js.map