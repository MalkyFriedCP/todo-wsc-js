import { dbService } from "../../services/db/db.service";
import {ITodo, IUser} from "../../globalTypes";

async function getAllUsers() {
  const users= await dbService.getCollection("users").findAll();
  return users as IUser[];
}

async function getUserById(id: string) {
  try {
    return await dbService.getCollection("users").findById(id);
  } catch (err) {
    throw new Error("Failed to get user by id");
  }
}

async function createUser(data: ITodo) {
  try {
    return await dbService.getCollection("users").create(data);
  } catch (err) {
    throw new Error("Failed to create user");
  }
}
async function updateUser(id: string, data: ITodo) {
  try {
    return await dbService.getCollection("users").update(id, data);
  } catch (err) {
    throw new Error("Failed to update user");
  }
}
async function deleteUser(id: string) {
  try {
    return await dbService.getCollection("users").delete(id);
  } catch (err) {
    throw new Error("Failed to delete user");
  }
}

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
