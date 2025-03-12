import express from "express";
import { getAll, getById, create, update, remove } from "./users.controller";
import {
  validate,
  validateNewUserRules,
  validateUserRules,
} from "../../middleware/validation.middleware";
import { verify } from "../../middleware/authentication.middleware";
import { authorize } from "../../middleware/authorization.middleware";

export const userRouter = express.Router();

userRouter.get("/", verify, authorize, getAll);
userRouter.get("/:id", verify, getById);
userRouter.post("/", validateNewUserRules, validate, verify, create);
userRouter.put("/:id", validateUserRules, validate, verify, update);
userRouter.delete("/:id", verify, authorize, remove);
