"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMedicalRecords = void 0;
const src_1 = require("src");
const getMedicalRecords = async () => {
    const records = await src_1.db.medicalRecord.findMany({
        include: {
            doctor: {
                select: {
                    userId: true,
                    name: true,
                    email: true,
                    phone: true,
                },
            },
            patient: {
                select: {
                    userId: true,
                    name: true,
                    email: true,
                    phone: true,
                },
            },
        },
        orderBy: {
            datetime: "desc",
        },
    });
    return records;
};
exports.getMedicalRecords = getMedicalRecords;
//# sourceMappingURL=get-medical-records.service.js.map