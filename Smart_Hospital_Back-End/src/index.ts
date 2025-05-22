import cors from 'cors';
import express, { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { env } from "./env";
import helmet from "helmet";
import { logger, loggerMiddleware } from "./shared/logger";
import { handlers } from "./handlers";
import { errorHandler } from "./shared/error-handler";
import { AppError } from "./shared/app-error";
import { StatusCodes } from "http-status-codes";
import { admin } from "./modules/admin";
import multer from "multer";
dotenv.config();

export const app = express();
export const upload = multer({ dest: "uploads/" });
export const db = new PrismaClient();

app.use(cors());
(async () => {
  await admin();

  app.use(express.json());
  app.use(express.static("uploads"));

    app.use('/uploads', express.static('uploads'));
  // app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(helmet());
  app.use((_, res, next) => {
    const oldJson = res.json;

    res.json = (body: string) => {
      res.locals.data = body;
      return oldJson.call(res, body);
    };

    const oldSend = res.send;

    res.send = (body: string) => {
      res.locals.data = body;
      return oldSend.call(res, body);
    };
    next();
  });
  app.use(loggerMiddleware);

  app.use(handlers);

  // 404 middleware
  app.all("*", (_: Request, __: Response, next) => {
    const error = new AppError(StatusCodes.NOT_FOUND, "Not found");

    next(error);
  });
  const server = app.listen(env.PORT, () => {
    logger.info(`server is running on http://localhost:${env.PORT}`);
  });

  // eslint-disable-next-line
  app.use((err: AppError, _: Request, res: Response, __: NextFunction) => {
    errorHandler(err, res);
  });

  process.on("uncaughtException", (err) => {
    logger.error(err.name, err.message);
    logger.fatal("UNHANDLED REJECTION! 💥 Shutting down...");

    errorHandler(err as AppError);

    server.close(() => {
      process.exit(1);
    });
  });

  process.on("SIGTERM", () => {
    logger.error("SIGTERM signal received: closing HTTP server");
    server.close(() => {
      logger.fatal("HTTP server closed");
    });
  });
})();
