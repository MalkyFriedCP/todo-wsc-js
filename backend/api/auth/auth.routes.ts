import express from "express";
import { register, login } from "./auth.controller";
import {
  validate,
  validateNewUserRules,
  validateUserRules,
} from "../../middleware/validation.middleware";
import { authenticate } from "../../middleware/authentication.middleware";

export const authRouter = express.Router();

authRouter.post("/register", validateNewUserRules, validate, register);
authRouter.post("/login", validateUserRules, validate, authenticate, login);
