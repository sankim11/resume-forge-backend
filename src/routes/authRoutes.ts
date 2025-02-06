import express from "express";
import { registerWithFirebase, loginWithFirebase } from "../controllers/authController";

const router = express.Router();

router.post("/register", registerWithFirebase);
router.post("/login", loginWithFirebase);

export default router;
