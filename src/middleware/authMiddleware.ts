import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Unauthorized - No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).userId = (decoded as any).userId;

    if (!(req as any).userId) {
      console.log("userId not found in token payload");
    } else {
      console.log("userId found:", (req as any).userId);
    }

    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};

export default authMiddleware;
