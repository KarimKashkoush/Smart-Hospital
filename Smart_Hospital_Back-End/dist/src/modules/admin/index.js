"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = void 0;
const env_1 = require("../../env");
const bcryptjs_1 = require("bcryptjs");
const client_1 = require("@prisma/client");
const logger_1 = require("src/shared/logger");
const admin = async () => {
    const db = new client_1.PrismaClient();
    try {
        const username = env_1.env.ADMIN_USERNAME;
        const password = env_1.env.ADMIN_PASSWORD;
        const doesAdminExist = await db.user.findUnique({
            where: { username: username },
        });
        if (!doesAdminExist) {
            const passwordHash = await bcryptjs_1.default.hash(password, 10);
            await db.user.create({
                data: {
                    username: username,
                    passwordHash: passwordHash,
                    role: client_1.Role.admin,
                    receptionist: {
                        create: {},
                    },
                },
            });
            logger_1.logger.info("✅ Admin created successfully");
        }
        else {
            logger_1.logger.info("Admin already exists");
        }
    }
    catch (error) {
        logger_1.logger.error("Something went wrong", error);
        process.exit(1);
    }
};
exports.admin = admin;
//# sourceMappingURL=index.js.map