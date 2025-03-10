import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { getAllUsers } from "../api/users/users.service";

export const validateTodoRules = [
  body("title").notEmpty().withMessage("Title is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("isCompleted").notEmpty().withMessage("isCompleted is required"),
  body("userId")
    .notEmpty()
    .withMessage("User Id is required")
    .custom(async (userId) => {
      if (
        await getAllUsers().then((users) =>
          users.some((user) => user.id === userId),
        )
      ) {
        throw new Error("No such user");
      }
      return true;
    }),
];

export const validateUserRules = [
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
  body("isAdmin").notEmpty().withMessage("isAdmin is required"),
  //if isAdmin is true then get the right RBAC
  // .custom((value) => {
  //   if (value !== true) {
  //     throw new Error("isAdmin must be true");
  //   }
  //   return true;
  // })
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
