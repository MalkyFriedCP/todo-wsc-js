import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { getAllUsers } from "../api/users/users.service";

export const validateTodoRules = [
  body("title").notEmpty().withMessage("Title is required"),
  body("category").notEmpty().withMessage("Category is required"),
];

export const validateNewUserRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address")
    .custom(async (email) => {
      if (
        await getAllUsers().then((users) =>
          users.some((user) => user.email === email),
        )
      ) {
        throw new Error("Email already in use");
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword()
    .withMessage("Password must be a strong password"),
];

export const validateUserRules = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword()
    .withMessage("Password must be a strong password"),
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
