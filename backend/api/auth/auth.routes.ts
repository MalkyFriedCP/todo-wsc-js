import express from "express";
import { register, login } from "./auth.controller";
import {
  validate,
  validateLoginUserRules,
  validateNewUserRules,
} from "../../middleware/validation.middleware";
import { authenticate } from "../../middleware/authentication.middleware";

export const authRouter = express.Router();

authRouter.post("/register", validateNewUserRules, validate, register);
authRouter.post(
  "/login",
  validateLoginUserRules,
  validate,
  authenticate,
  login,
);
