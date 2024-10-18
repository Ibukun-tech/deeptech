import winston from "winston";

export const LOG_CONSOLE = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

const levels = {
  error: "error",
  warn: "warn",
  info: "info",
  debug: "debug",
};

export const logger = {
  error: (message) => LOG_CONSOLE.log({ level: levels.error, message }),
  warn: (message) => LOG_CONSOLE.log({ level: levels.warn, message }),
  info: (message) => LOG_CONSOLE.log({ level: levels.info, message }),
  debug: (message) => LOG_CONSOLE.log({ level: levels.debug, message }),
};

