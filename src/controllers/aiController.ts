import { Request, Response } from "express";
import openai from "../utils/openaiClient";

export const generateResume = async (req: Request, res: Response) => {
  try {
    const { userPrompt } = req.body;
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: `Generate a professional resume based on: ${userPrompt}`,
        },
      ],
    });

    res.json({ resume: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "AI generation failed" });
  }
};
