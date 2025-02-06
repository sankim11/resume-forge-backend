import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createResume = async (req: Request, res: Response) => {
  try {
    const { title, experience, projects, skills, education, userId } = req.body;

    const newResume = await prisma.resume.create({
      data: {
        userId,
        title,
        experience,
        projects,
        skills,
        education,
      },
    });

    res.status(201).json(newResume);
  } catch (error) {
    console.error("Error creating resume:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserResumes = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const resumes = await prisma.resume.findMany({ where: { userId } });

    res.json(resumes);
  } catch (error) {
    console.error("Error fetching resumes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getResume = async (req: Request, res: Response) => {
  try {
    const resume = await prisma.resume.findUnique({
      where: { id: req.params.id },
    });

    res.json(resume);
  } catch (error) {
    console.error("Error fetching resume:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateResume = async (req: Request, res: Response) => {
  try {
    const { title, experience, projects, skills, education } = req.body;
    const resume = await prisma.resume.update({
      where: { id: req.params.id },
      data: { title, experience, projects, skills, education },
    });

    res.json(resume);
  } catch (error) {
    console.error("Error updating resume:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteResume = async (req: Request, res: Response) => {
  try {
    await prisma.resume.delete({ where: { id: req.params.id } });
    res.json({ message: "Resume deleted" });
  } catch (error) {
    console.error("Error deleting resume:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
