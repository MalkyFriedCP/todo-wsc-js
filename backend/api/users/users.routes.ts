import express from "express";
import { getAll, getById, create, update, remove } from "./users.controller";
import {
  validate,
  validateNewUserRules,
  validateUserRules,
} from "../../middleware/validation.middleware";

export const userRouter = express.Router();

userRouter.get("/", getAll);
userRouter.get("/:id", getById);
userRouter.post("/", validateNewUserRules, validate, create);
userRouter.put("/:id", update);
userRouter.delete("/:id", remove);
