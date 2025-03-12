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
  validateTodoRules,
} from "../../middleware/validation.middleware";
import { verify } from "../../middleware/authentication.middleware";

export const todoRouter = express.Router();

todoRouter.get("/", verify, getAll);
// todoRouter.get("/:id", getById);
todoRouter.get("/user", verify, getByUserId);
todoRouter.post("/", validateTodoRules, validate, verify, create);
todoRouter.put("/:id", verify, update);
todoRouter.delete("/:id", verify, remove);
