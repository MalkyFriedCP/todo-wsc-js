import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const validateTodoRules = [
  body("title").notEmpty().withMessage("Title is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("userId").notEmpty().withMessage("User Id is required"),
  //check if the user exists
];

export const validateUserRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address"),
  body("isAdmin")
    .notEmpty()
    .withMessage("isAdmin is required")
    .custom((value) => {
      if (value !== true) {
        throw new Error("isAdmin must be true");
      }
      return true;
    }),
  body("password").notEmpty().withMessage("Password is required"),
];

export async function validate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}
