import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.status || 500;
  const message = err.message || "Something went wrong!";
  const details = err.details || null;

  logger.error(
    `${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${details}`,
  );

  return res.status(statusCode).json({
    success: false,
    message,
    details,
  });
};
