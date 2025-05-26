"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPatients = void 0;
const src_1 = require("src");
const getAllPatients = async () => {
    const patients = await src_1.db.patient.findMany({
        include: {
            user: {
                select: {
                    username: true,
                    image: true,
                },
            },
        },
    });
    return patients.map((patient) => ({
        ...patient,
        username: patient.user.username,
        avatar: patient.user.image,
    }));
};
exports.getAllPatients = getAllPatients;
//# sourceMappingURL=get-all-patients.service.js.map