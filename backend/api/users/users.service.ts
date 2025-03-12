import { dbService } from "../../services/db/db.service";
import { IUser } from "../../globalTypes";
import bcrypt from "bcryptjs";
import { getTodosByUserId } from "../todos/todos.service";

async function getAllUsers() {
  try {
    const users = await dbService.getCollection("users").findAll();
    return users as IUser[];
  } catch (err) {
    throw new Error("Failed to fetch users from database");
  }
}

async function getUserById(id: string) {
  try {
    const user = await dbService.getCollection("users").findById(id);
    if (!user) throw new Error("User not found");
    return user;
  } catch (err: any) {
    throw new Error(`Failed to get user by id: ${err.message}`);
  }
}

async function createUser(data: IUser) {
  try {
    // Set default isAdmin as false for new users
    data.isAdmin = false;
    // Encrypt the password
    data.password = await bcrypt.hash(data.password, 10);
    return await dbService.getCollection("users").create(data);
  } catch (err: any) {
    throw new Error("Failed to create user: " + err.message);
  }
}

async function updateUser(id: string, data: IUser) {
  try {
    const user = (await getUserById(id)) as IUser; // Verify user exists
    if (!user) {
      throw new Error("User not found");
    }

    // Allow only admins to update isAdmin field
    if (data.isAdmin !== undefined && !user.isAdmin) {
      throw new Error("Forbidden: Only admins can change isAdmin");
    }

    return await dbService.getCollection("users").update(id, data);
  } catch (err: any) {
    throw new Error(`Failed to update user: ${err.message}`);
  }
}

async function deleteUser(id: string) {
  try {
    // Delete all todos associated with the user
    const todos = await getTodosByUserId(id);
    for (const todo of todos) {
      await dbService.getCollection("todos").delete(todo.id);
    }
    return await dbService.getCollection("users").delete(id);
  } catch (err: any) {
    throw new Error("Failed to delete user: " + err.message);
  }
}

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
