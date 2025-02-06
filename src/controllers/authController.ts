import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import admin from "../utils/firebaseAdmin"; // Firebase Admin SDK
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const registerWithFirebase = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    // Verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid, email, firebase } = decodedToken;

    if (!uid || !email) {
      throw new Error("UID or email is not defined");
    }

    const googleId = firebase?.sign_in_provider === "google.com" ? uid : null;

    let user = await prisma.user.findUnique({ where: { id: uid } });

    if (!user) {
      user = await prisma.user.create({
        data: { id: uid, email, googleId },
      });
    } else {
      user = await prisma.user.update({
        where: { id: uid },
        data: { googleId },
      });
    }

    res.status(201).json(user);
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const loginWithFirebase = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid, email, firebase } = decodedToken;

    if (!uid || !email) {
      throw new Error("UID or email is not defined");
    }

    const googleId = firebase?.sign_in_provider === "google.com" ? uid : null;

    let user= await prisma.user.findUnique({ where: { id: uid } });

    if (!user) {
      user = await prisma.user.create({
        data: { id: uid, email, googleId },
      });
    } else if (!user.googleId && googleId) {
      user = await prisma.user.update({
        where: { id: uid },
        data: { googleId },
      });
    }

    const userId = user.id;

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const customToken = jwt.sign({ userId }, jwtSecret, {
      expiresIn: "1h",
    });
    console.log(customToken, "customToken");
    console.log(userId, "userId");

    res.json({ token: customToken, userId: userId });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(401).json({ error: "Authentication failed" });
  }
};
