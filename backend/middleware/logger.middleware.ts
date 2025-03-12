import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

// Log incoming requests
export const logRequest = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.url}`);
  next();
};
