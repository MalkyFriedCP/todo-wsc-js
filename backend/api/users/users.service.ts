import { dbService } from "../../services/db/db.service";
import { IUser } from "../../globalTypes";
import bcrypt from "bcryptjs";
import { deleteTodo, getTodosByUserId } from "../todos/todos.service";
import logger from "../../utils/logger";
import ServiceError from "../../utils/error";

async function getAllUsers() {
  try {
    const users = (await dbService.getCollection("users").findAll()) as IUser[];
    return { success: true, data: users };
  } catch (err: any) {
    logger.error(`Error fetching all users: ${err.message}`);
    throw new ServiceError(
      "Failed to fetch users from the database",
      500,
      err.message,
    );
  }
}

async function getUserById(id: string) {
  try {
    const user = (await dbService.getCollection("users").findById(id)) as IUser;
    if (!user) {
      throw new ServiceError("User not found", 404, { id });
    }
    return { success: true, data: user };
  } catch (err: any) {
    logger.error(`Error fetching user by ID: ${err.message}`);
    throw new ServiceError("Failed to get user by id", 500, err.message);
  }
}

async function createUser(data: IUser) {
  try {
    data.isAdmin = false; // Set default isAdmin as false for new users
    data.password = await bcrypt.hash(data.password, 10); // Encrypt the password
    const newUser = await dbService.getCollection("users").create(data);
    return { success: true, data: newUser };
  } catch (err: any) {
    logger.error(`Error creating user: ${err.message}`);
    throw new ServiceError("Failed to create user", 400, err.message);
  }
}

async function updateUser(id: string, data: Partial<IUser>) {
  try {
    const user = await getUserById(id);
    const updatedUser = await dbService.getCollection("users").update(id, data);
    return { success: true, data: updatedUser };
  } catch (err: any) {
    logger.error(`Error updating user with id ${id}: ${err.message}`);
    throw new ServiceError("Failed to update user", 400, err.message);
  }
}

async function updateRole(id: string) {
  try {
    const payload = await getUserById(id);
    const user = payload as { success: boolean; data: IUser };
    const updatedUser = await dbService.getCollection("users").update(id, {
      isAdmin: !user.data.isAdmin,
    });
    return { success: true, data: updatedUser };
  } catch (err: any) {
    logger.error(`Error updating user role with id ${id}: ${err.message}`);
    throw new ServiceError("Failed to update user role", 400, err.message);
  }
}

async function deleteUser(id: string) {
  try {
    const todos = await getTodosByUserId(id);
    for (const todo of todos) {
      await deleteTodo(todo.id);
    }
    const deletedUser = await dbService.getCollection("users").delete(id);
    return { success: true, data: deletedUser };
  } catch (err: any) {
    logger.error(`Error deleting user with id ${id}: ${err.message}`);
    throw new ServiceError("Failed to delete user", 400, err.message);
  }
}

export {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateRole,
  deleteUser,
};
