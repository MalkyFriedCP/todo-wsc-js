import { dbService } from "../../services/db/db.service";
import { ITodo } from "../../globalTypes";

async function getAllTodos() {
  return await dbService.getCollection("todos").findAll();
}

async function getTodosById(id: string) {
  try {
    return await dbService.getCollection("todos").findById(id);
  } catch (err) {
    throw new Error("Failed to get todo by id");
  }
}

async function createTodo(data: ITodo) {
  try {
    return await dbService.getCollection("todos").create(data);
  } catch (err) {
    throw new Error("Failed to create todo");
  }
}
async function updateTodo(id: string, data: ITodo) {
  try {
    return await dbService.getCollection("todos").update(id, data);
  } catch (err) {
    throw new Error("Failed to update todo");
  }
}
async function deleteTodo(id: string) {
  try {
    return await dbService.getCollection("todos").delete(id);
  } catch (err) {
    throw new Error("Failed to delete todo");
  }
}

export { getAllTodos, getTodosById, createTodo, updateTodo, deleteTodo };
