import { Request, Response, NextFunction } from "express";
import winston, { transports, createLogger, format } from "winston";

// Create the logger instance
const logger = createLogger({
  level: "info",
  format: format.json(),
  transports: [
    // File transport for errors
    new transports.File({ filename: "error.log", level: "error" }),
    // File transport for all logs
    new transports.File({ filename: "combined.log" }),
  ],
});

// Only add console transport in non-production environments
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.simple(),
    }),
  );
}

// Log incoming requests
export const logRequest = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.url}`);
  next();
};
