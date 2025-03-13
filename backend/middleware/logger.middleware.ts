import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

export const logRequest = (req: Request, res: Response, next: NextFunction) => {
  // Log basic request details
  logger.info(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - Body: ${JSON.stringify(req.body)} - Query: ${JSON.stringify(req.query)}`,
  );
  const startTime = Date.now();
  // Capture the response status after the request has been handled
  res.on("finish", () => {
    const duration = Date.now() - startTime;
    logger.info(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - Status: ${res.statusCode} - Duration: ${duration}ms`,
    );
  });
  next();
};
