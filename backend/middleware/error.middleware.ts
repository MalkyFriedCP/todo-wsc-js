import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.status || 500;
  const message = err.message || "Something went wrong!";

  // Log error for debugging
  console.error(err);

  return res.status(statusCode).json({
    success: false,
    message,
  });
};
