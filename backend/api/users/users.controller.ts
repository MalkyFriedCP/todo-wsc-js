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
    res.status(200).send(users);
  } catch (err: any) {
    res.status(500).send({ error: `Failed to get users: ${err.message}` });
  }
}

async function getById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    res.status(200).send(user);
  } catch (err: any) {
    res.status(404).send({ error: `User not found: ${err.message}` });
  }
}

async function create(req: Request, res: Response) {
  try {
    const data = req.body;
    const user = await createUser(data);
    res.status(201).send(user);
  } catch (err: any) {
    res.status(400).send({ error: `Failed to create user: ${err.message}` });
  }
}

async function update(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data = req.body;
    const user = await updateUser(id, data);
    res.status(200).send(user);
  } catch (err: any) {
    res.status(403).send({ error: `Failed to update user: ${err.message}` });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await deleteUser(id);
    res.status(200).send(user);
  } catch (err: any) {
    res.status(500).send({ error: `Failed to delete user: ${err.message}` });
  }
}

export { getAll, getById, create, update, remove };
