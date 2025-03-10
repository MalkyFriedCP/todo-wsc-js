import { Request, Response, NextFunction } from "express";

export async function exampleMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log('Example middleware');
  next();
}
