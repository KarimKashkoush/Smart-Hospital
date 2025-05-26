"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLabTests = getLabTests;
const src_1 = require("src");
async function getLabTests({ filter }) {
    if (filter === "accepted")
        return await src_1.db.labTest.findMany({ where: { accepted: true } });
    if (filter === "all")
        return await src_1.db.labTest.findMany();
}
//# sourceMappingURL=get-lab-tests.service.js.map