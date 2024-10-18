import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = "your_jwt_secret";

interface CustomRequest extends Request {
  userId?: string | JwtPayload;
}

export const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded;
    next();
  } catch (error: any) {
    res.status(400).json({ message: "Invalid token" });
  }
};
