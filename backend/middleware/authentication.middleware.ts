import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { getAllUsers } from "../api/users/users.service";
import { generateToken, verifyToken } from "../services/jwt/jwt.service";
import { JwtPayload } from "jsonwebtoken";

async function comparePassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await getAllUsers().then((users) =>
    users.find((user) => user.email === email),
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Check if the password is correct
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) {
    return res.status(500).json({
      message: "Server error: JWT secret key not defined",
    });
  }
  const payload = { email: user.email, id: user.id };
  req.body.token = generateToken(payload, secretKey, { expiresIn: "1h" });
  next();
};

export const verify = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization?.split(" ")[1]; // 'Bearer <token>'
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) {
    return res.status(500).json({
      message: "Server error: JWT secret key not defined",
    });
  }

  try {
    // Verify the token and decode it directly
    const decoded = verifyToken(token, secretKey);

    // Type guard to check if decoded is a valid JwtPayload
    if (typeof decoded !== "object" || !decoded.email || !decoded.id) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    // Find the user from the database using the decoded information
    const user = await getAllUsers().then((users) =>
      users.find((user) => user.email === decoded.email),
    );
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach user info to req for use in subsequent middlewares or routes
    req.body.user = user; // This keeps it consistent with your auth flow
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
