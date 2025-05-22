import { env } from "../../env";
import bcrypt from "bcryptjs";
import { PrismaClient, Role } from "@prisma/client";
import { logger } from "src/shared/logger";

export const admin = async (): Promise<void> => {
  const db = new PrismaClient();
  try {
    const username = env.ADMIN_USERNAME;
    const password = env.ADMIN_PASSWORD;

    const doesAdminExist = await db.user.findUnique({
      where: { username: username },
    });

    if (!doesAdminExist) {
      const passwordHash = await bcrypt.hash(password, 10);

      await db.user.create({
        data: {
          username: username,
          passwordHash: passwordHash,
          role: Role.admin,
          receptionist: {
            create: {},
          },
        },
      });

      logger.info("✅ Admin created successfully");
    } else {
      logger.info("Admin already exists");
    }
  } catch (error) {
    logger.error("Something went wrong", error);
    process.exit(1);
  }
};
