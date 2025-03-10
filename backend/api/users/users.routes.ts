import express from "express";
import { getAll, getById, create, update, remove } from "./users.controller";
import {
  validate,
  validateUserRules,
} from "../../middleware/validation.middleware";

export const userRouter = express.Router();

userRouter.get("/", getAll);
userRouter.get("/:id", getById);
userRouter.post("/", validateUserRules, validate, create);
userRouter.put("/:id", update);
userRouter.delete("/:id", remove);
