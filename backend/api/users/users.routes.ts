import express from "express";
import {
  getAll,
  getById,
  create,
  update,
  remove,
  updateUserRole,
} from "./users.controller";
import {
  validate,
  validateExistingUserRules,
  validateNewUserRules,
} from "../../middleware/validation.middleware";
import { verify } from "../../middleware/authentication.middleware";
import { authorize } from "../../middleware/authorization.middleware";

export const userRouter = express.Router();

userRouter.get("/", verify, authorize, getAll);
// userRouter.get("/:id", verify, getById);
// userRouter.post("/", validateNewUserRules, validate, create);
userRouter.put("/:id", validateExistingUserRules, validate, verify, update);
userRouter.patch("/:id", verify, authorize, updateUserRole);
userRouter.delete("/:id", verify, authorize, remove);
