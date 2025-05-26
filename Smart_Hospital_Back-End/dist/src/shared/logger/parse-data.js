"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseData = parseData;
function parseData(data) {
    try {
        return JSON.stringify(JSON.parse(data), null, 2);
    }
    catch {
        return data;
    }
}
//# sourceMappingURL=parse-data.js.map