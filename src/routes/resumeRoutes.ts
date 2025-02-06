import express from "express";
import * as ResumeController from "../controllers/resumeController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", authMiddleware, ResumeController.createResume);
router.get("/all", authMiddleware, ResumeController.getUserResumes);
router.get("/:id", authMiddleware, ResumeController.getResume);
router.put("/:id/update", authMiddleware, ResumeController.updateResume);
router.delete("/:id/delete", authMiddleware, ResumeController.deleteResume);


export default router;
