import { apiLogger } from "./api-logger";
import { logger } from "./logger";
import { loggerMiddleware } from "./middleware";

export { apiLogger, logger, loggerMiddleware };

// export const loggerMiddleware = pinoHttp({
//   // transport: {
//   //   target: "pino-pretty",
//   //   options: {
//   //     colorize: true, // Color-coded logs
//   //     translateTime: "yyyy-mm-dd HH:MM:ss.l Z", // Fastify-style timestamp
//   //     ignore: "pid,hostname", // Remove unnecessary fields
//   //     customPrettifiers: {
//   //       time: (timestamp: string) => `🕰 ${timestamp}`,
//   //     },
//   //   },
//   // },
// });
