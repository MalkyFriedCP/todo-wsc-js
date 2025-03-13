import { NextFunction, Request, Response } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateRole,
  updateUser,
} from "./users.service";

async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await getAllUsers();
    res.status(200).send(users);
  } catch (err: any) {
    next(err);
  }
}

async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    res.status(200).send(user);
  } catch (err: any) {
    next(err);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const data = req.body;
    const user = await createUser(data);
    res.status(201).send(user);
  } catch (err: any) {
    next(err);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const data = req.body;
    const user = await updateUser(id, data);
    res.status(200).send(user);
  } catch (err: any) {
    next(err);
  }
}

async function updateUserRole(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const { action } = req.body;

  if (!action || (action !== "promote" && action !== "demote")) {
    return res
      .status(400)
      .json({ message: "Invalid action. Must be 'promote' or 'demote'." });
  }

  try {
    const user = await getUserById(id);
    if (user.success) {
      const isAdmin = action === "promote";
      if (user.data.isAdmin === isAdmin) {
        return res.status(400).json({
          message: `User is already ${isAdmin ? "an admin" : "not an admin"}`,
        });
      }
      await updateRole(id);
      res.status(200).json("User role updated successfully");
    }
  } catch (err: any) {
    next(err);
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const user = await deleteUser(id);
    res.status(200).send(user);
  } catch (err: any) {
    next(err);
  }
}

export { getAll, getById, create, update, updateUserRole, remove };
