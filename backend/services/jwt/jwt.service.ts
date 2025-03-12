import jwt from "jsonwebtoken";

export const generateToken = (payload: any, secretKey: string, options: any) =>
  jwt.sign(payload, secretKey, options);

export const verifyToken = (token: string, secretKey: string) =>
  jwt.verify(token, secretKey);

export const decodeToken = (token: string) => jwt.decode(token);
