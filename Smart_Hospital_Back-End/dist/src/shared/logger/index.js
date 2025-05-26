"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = exports.logger = exports.apiLogger = void 0;
const api_logger_1 = require("./api-logger");
Object.defineProperty(exports, "apiLogger", { enumerable: true, get: function () { return api_logger_1.apiLogger; } });
const logger_1 = require("./logger");
Object.defineProperty(exports, "logger", { enumerable: true, get: function () { return logger_1.logger; } });
const middleware_1 = require("./middleware");
Object.defineProperty(exports, "loggerMiddleware", { enumerable: true, get: function () { return middleware_1.loggerMiddleware; } });
//# sourceMappingURL=index.js.map