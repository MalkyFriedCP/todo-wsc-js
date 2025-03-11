import { Request, Response } from "express";
import { createUser, getUserById } from "../users/users.service";

async function register(req: Request, res: Response) {
  try {
    const data = req.body;
    const user = await createUser(data);
    res.send(user);
  } catch (err) {
    res.status(404).send({ err: "Failed to create user" });
  }
}

async function login(req: Request, res: Response) {
  try {
    const payload = { email: req.body.email, token: req.body.token };
    res.send(payload);
  } catch (err) {
    res.status(404).send({ err: (err as Error).message });
  }
}

export { register, login };
