import { Request, Response, NextFunction } from "express";

export const authorize = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.body.user.isAdmin ? "admin" : "user";

    if (userRole === "user") {
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient permissions" });
    }
    next();
  };
};
