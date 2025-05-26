"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLabTest = createLabTest;
const src_1 = require("src");
const app_error_1 = require("src/shared/app-error");
const http_status_codes_1 = require("http-status-codes");
async function createLabTest({ date, attachment, name, status, referringDoctorId, patientUsername, }) {
    const attachmentPath = attachment ? "/" + attachment.filename : undefined;
    const doctorId = Number(referringDoctorId);
    if (isNaN(doctorId)) {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid doctor ID format");
    }
    const checkDoctorExists = (await src_1.db.doctor.count({ where: { userId: doctorId } })) > 0;
    if (!checkDoctorExists) {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "The referring doctor ID is invalid");
    }
    const user = await src_1.db.user.findUnique({
        where: { username: patientUsername },
        include: {
            patient: true,
        },
    });
    if (!user?.patient) {
        throw new app_error_1.AppError(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid patient username");
    }
    console.log({ attachment, attachmentPath });
    const labTest = await src_1.db.labTest.create({
        data: {
            name,
            status: status ?? "completed",
            date,
            ...(attachment ? { attachment: attachmentPath } : { attachment: "" }),
            referringDoctor: {
                connect: {
                    userId: doctorId,
                },
            },
            patient: {
                connect: {
                    userId: user.id,
                },
            },
        },
    });
    return labTest;
}
//# sourceMappingURL=create-lab-test.service.js.map