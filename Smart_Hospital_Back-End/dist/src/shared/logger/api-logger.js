"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiLogger = void 0;
const pino_1 = require("pino");
const pino_pretty_1 = require("pino-pretty");
const date_fns_1 = require("date-fns");
const parse_data_1 = require("./parse-data");
exports.apiLogger = (0, pino_1.default)((0, pino_pretty_1.default)({
    colorize: true,
    ignore: "pid,hostname,level,time",
    singleLine: true,
    hideObject: true,
    messageFormat: (log, _, __, { colors }) => {
        return `${colors.gray(`[${(0, date_fns_1.format)(new Date(log.time), "dd-M-y k:m:s-SS O")}]`)} ${colors.green(log.data.method.toUpperCase())} [${colors.cyan(log.data.route)}] ${colors.white(log.data.statusCode)}: ${colors.white((0, parse_data_1.parseData)(log.data.data))}\n`;
    },
}));
//# sourceMappingURL=api-logger.js.map