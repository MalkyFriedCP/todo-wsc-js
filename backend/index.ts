import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { config } from "./config";
import { todoRouter } from "./api/todos/todos.routes";
import { userRouter } from "./api/users/users.routes";
import { authRouter } from "./api/auth/auth.routes";

const path = config.isProduction() ? ".env.prod" : ".env.dev";

dotenv.config({
  path: [path],
});

const app = express();
const PORT = process.env.PORT;
const corsOrigins = process.env.CORS;
const corsOptions = {
  origin: corsOrigins,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/todos", todoRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.get("/", (request: Request, response: Response) => {
  response.status(200).send(`localhost:${PORT}/todos`);
});
app.get("/", (request: Request, response: Response) => {
  response.status(200).send(`localhost:${PORT}/users`);
});
app.get("/", (request: Request, response: Response) => {
  response.status(200).send(`localhost:${PORT}/auth`);
});

app
  .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });
