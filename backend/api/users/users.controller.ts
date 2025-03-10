import { Request, Response } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "./users.service";

async function getAll(req: Request, res: Response) {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (err) {
    res.status(404).send({ err: "Failed to get users" });
  }
}

async function getById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    res.send(user);
  } catch (err) {
    res.status(404).send({ err: (err as Error).message });
  }
}

async function create(req: Request, res: Response) {
  try {
    const data = req.body;
    const user = await createUser(data);
    res.send(user);
  } catch (err) {
    res.status(404).send({ err: "Failed to create user" });
  }
}

async function update(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data = req.body;
    const user = await updateUser(id, data);
    res.send(user);
  } catch (err) {
    res.status(404).send({ err: "Failed to update user" });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await deleteUser(id);
    res.send(user);
  } catch (err) {
    res.status(404).send({ err: "Failed to delete user" });
  }
}

export { getAll, getById, create, update, remove };
