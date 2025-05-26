"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = require("../logger");
const errorHandler = (err, res) => {
    logger_1.logger.info(err);
    if (!err?.isOperational) {
        process.exit(1);
    }
    if (res) {
        try {
            res.status(err.statusCode).json(JSON.parse(err.message));
        }
        catch {
            res.status(err.statusCode).json({ message: err.message });
        }
    }
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=index.js.map