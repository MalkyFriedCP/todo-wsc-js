import express from "express";
import { getAll, getById, create, update, remove } from "./todos.controller";
import {
  validate,
  validateTodoRules,
} from "../../middleware/validation.middleware";

export const todoRouter = express.Router();

todoRouter.get("/", getAll);
todoRouter.get("/:id", getById);
todoRouter.post("/", validateTodoRules, validate, create);
todoRouter.put("/:id", update);
todoRouter.delete("/:id", remove);
