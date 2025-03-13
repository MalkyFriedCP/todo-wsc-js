import { dbService } from "../../services/db/db.service";
import { ITodo } from "../../globalTypes";
import logger from "../../utils/logger";
import ServiceError from "../../utils/error";

async function getAllTodos() {
  try {
    return await dbService.getCollection("todos").findAll();
  } catch (err: any) {
    logger.error(`Error fetching all todos: ${err.message}`);
    throw new ServiceError(
      "Failed to fetch todos from the database",
      500,
      err.message,
    );
  }
}

async function getTodosById(id: string) {
  try {
    const todo = await dbService.getCollection("todos").findById(id);
    if (!todo) {
      throw new ServiceError("Todo not found", 404, { id });
    }
    return todo;
  } catch (err: any) {
    logger.error(`Error fetching todo by ID: ${err.message}`);
    throw new ServiceError("Failed to get todo by id", 500, err.message);
  }
}

async function getTodosByUserId(userId: string) {
  try {
    const allTodos = (await dbService
      .getCollection("todos")
      .findAll()) as ITodo[];
    return allTodos.filter((todo: ITodo) => todo.userId === userId);
  } catch (err: any) {
    logger.error(`Error fetching todos for userId ${userId}: ${err.message}`);
    throw new ServiceError(
      "Failed to get todos for this user",
      500,
      err.message,
    );
  }
}

async function createTodo(data: ITodo) {
  try {
    data.isCompleted = false; // Set default value
    return await dbService.getCollection("todos").create(data);
  } catch (err: any) {
    logger.error(`Error creating todo: ${err.message}`);
    throw new ServiceError("Failed to create todo", 400, err.message);
  }
}

async function updateTodo(id: string, data: ITodo) {
  try {
    const existingTodo = (await getTodosById(id)) as ITodo;
    if (existingTodo.userId !== data.userId) {
      throw new ServiceError("You are not authorized to update this todo", 403);
    }
    return await dbService.getCollection("todos").update(id, data);
  } catch (err: any) {
    logger.error(`Error updating todo with id ${id}: ${err.message}`);
    throw new ServiceError("Failed to update todo", 400, err.message);
  }
}

async function deleteTodo(id: string) {
  try {
    return await dbService.getCollection("todos").delete(id);
  } catch (err: any) {
    logger.error(`Error deleting todo with id ${id}: ${err.message}`);
    throw new ServiceError("Failed to delete todo", 400, err.message);
  }
}

export {
  getAllTodos,
  getTodosById,
  getTodosByUserId,
  createTodo,
  updateTodo,
  deleteTodo,
};
