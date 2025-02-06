import { Request, Response, NextFunction } from "express";
import admin from "../utils/firebaseAdmin";

const firebaseAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ error: "Unauthorized - No token provided" });
      return;
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    (req as any).userId = decodedToken.uid;

    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};

export default firebaseAuthMiddleware;
