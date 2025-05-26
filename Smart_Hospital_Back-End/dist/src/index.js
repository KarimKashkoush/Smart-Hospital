"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.upload = exports.app = void 0;
const cors_1 = require("cors");
const express_1 = require("express");
const client_1 = require("@prisma/client");
const dotenv_1 = require("dotenv");
const body_parser_1 = require("body-parser");
const env_1 = require("./env");
const helmet_1 = require("helmet");
const logger_1 = require("./shared/logger");
const handlers_1 = require("./handlers");
const error_handler_1 = require("./shared/error-handler");
const app_error_1 = require("./shared/app-error");
const http_status_codes_1 = require("http-status-codes");
const admin_1 = require("./modules/admin");
const multer_1 = require("multer");
dotenv_1.default.config();
exports.app = (0, express_1.default)();
exports.upload = (0, multer_1.default)({ dest: "uploads/" });
exports.db = new client_1.PrismaClient();
exports.app.use((0, cors_1.default)());
(async () => {
    await (0, admin_1.admin)();
    exports.app.use(express_1.default.json());
    exports.app.use(express_1.default.static("uploads"));
    exports.app.use('/uploads', express_1.default.static('uploads'));
    exports.app.use(body_parser_1.default.json());
    exports.app.use(body_parser_1.default.urlencoded({ extended: true }));
    exports.app.use((0, helmet_1.default)());
    exports.app.use((_, res, next) => {
        const oldJson = res.json;
        res.json = (body) => {
            res.locals.data = body;
            return oldJson.call(res, body);
        };
        const oldSend = res.send;
        res.send = (body) => {
            res.locals.data = body;
            return oldSend.call(res, body);
        };
        next();
    });
    exports.app.use(logger_1.loggerMiddleware);
    exports.app.use(handlers_1.handlers);
    exports.app.all("*", (_, __, next) => {
        const error = new app_error_1.AppError(http_status_codes_1.StatusCodes.NOT_FOUND, "Not found");
        next(error);
    });
    const server = exports.app.listen(env_1.env.PORT, () => {
        logger_1.logger.info(`server is running on http://localhost:${env_1.env.PORT}`);
    });
    exports.app.use((err, _, res, __) => {
        (0, error_handler_1.errorHandler)(err, res);
    });
    process.on("uncaughtException", (err) => {
        logger_1.logger.error(err.name, err.message);
        logger_1.logger.fatal("UNHANDLED REJECTION! 💥 Shutting down...");
        (0, error_handler_1.errorHandler)(err);
        server.close(() => {
            process.exit(1);
        });
    });
    process.on("SIGTERM", () => {
        logger_1.logger.error("SIGTERM signal received: closing HTTP server");
        server.close(() => {
            logger_1.logger.fatal("HTTP server closed");
        });
    });
})();
//# sourceMappingURL=index.js.map