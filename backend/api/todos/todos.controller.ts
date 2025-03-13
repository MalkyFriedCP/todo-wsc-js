import { NextFunction, Request, Response } from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodosById,
  getTodosByUserId,
  updateTodo,
} from "./todos.service";

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const todos = await getAllTodos();
    res.status(200).send(todos);
  } catch (err: any) {
    next(err);
  }
}

async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const todo = await getTodosById(id);
    res.status(200).send(todo);
  } catch (err: any) {
    next(err);
  }
}

async function getByUserId(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.query.id;
    const todos = await getTodosByUserId(userId as string);
    res.status(200).send(todos);
  } catch (err: any) {
    next(err);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const data = req.body;
    data.userId = req.query.id;
    const todo = await createTodo(data);
    res.status(201).send(todo);
  } catch (err: any) {
    next(err);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const data = req.body;
    data.userId = req.query.id;
    const todo = await updateTodo(id, data);
    res.status(200).send(todo);
  } catch (err: any) {
    next(err);
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const todo = await deleteTodo(id);
    res.status(200).send(todo);
  } catch (err: any) {
    next(err);
  }
}

export { getAll, getById, getByUserId, create, update, remove };
