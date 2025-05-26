"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino_1 = require("pino");
const pino_pretty_1 = require("pino-pretty");
exports.logger = (0, pino_1.default)((0, pino_pretty_1.default)({
    colorize: true,
    translateTime: "yyyy-mm-dd HH:MM:ss.l Z",
    ignore: "pid,hostname",
}));
//# sourceMappingURL=logger.js.map