import express from "express";
import {
  getAll,
  getById,
  getByUserId,
  create,
  update,
  remove,
} from "./todos.controller";
import {
  validate,
  validateNewTodoRules,
  validateTodoRules,
} from "../../middleware/validation.middleware";
import { authorize, verify } from "../../middleware/authentication.middleware";

export const todoRouter = express.Router();

todoRouter.get("/", verify, authorize, getAll);
// todoRouter.get("/:id", getById);
todoRouter.get("/user", verify, getByUserId);
todoRouter.post("/", validateNewTodoRules, validate, verify, create);
todoRouter.put("/:id", verify, update);
todoRouter.delete("/:id", verify, authorize, remove);
