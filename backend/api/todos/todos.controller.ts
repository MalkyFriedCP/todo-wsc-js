import { Request, Response } from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodosById,
  getTodosByUserId,
  updateTodo,
} from "./todos.service";

async function getAll(req: Request, res: Response) {
  try {
    const user = req.body;
    const todos = await getAllTodos();
    res.send(todos);
  } catch (err) {
    res.status(404).send({ err: "Failed to get todos" });
  }
}

async function getById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const todo = await getTodosById(id);
    res.send(todo);
  } catch (err) {
    res.status(404).send({ err: (err as Error).message });
  }
}

async function getByUserId(req: Request, res: Response) {
  try {
    const userId = req.query.id;
    const todos = await getTodosByUserId(userId as string);
    res.send(todos);
  } catch (err) {
    res.status(404).send({ err: (err as Error).message });
  }
}

async function create(req: Request, res: Response) {
  try {
    const data = req.body;
    data.userId = req.query.id;
    const todo = await createTodo(data);
    res.send(todo);
  } catch (err) {
    res.status(404).send({ err: "Failed to create todo" });
  }
}

async function update(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data = req.body;
    data.userId = req.query.id;
    const todo = await updateTodo(id, data);
    res.send(todo);
  } catch (err) {
    res.status(404).send({ err: "Failed to update todo" });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const todo = await deleteTodo(id);
    res.send(todo);
  } catch (err) {
    res.status(404).send({ err: "Failed to delete todo" });
  }
}

export { getAll, getById, getByUserId, create, update, remove };
