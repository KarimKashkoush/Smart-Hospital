"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = loggerMiddleware;
const api_logger_1 = require("./api-logger");
function loggerMiddleware(req, res, next) {
    res.on("finish", () => {
        api_logger_1.apiLogger.info({
            data: {
                route: req.path,
                statusCode: res.statusCode,
                method: req.method,
                data: res.locals.data,
                response: res,
                request: req,
            },
        });
    });
    next();
}
//# sourceMappingURL=middleware.js.map