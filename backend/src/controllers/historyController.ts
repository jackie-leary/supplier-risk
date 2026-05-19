import { Request, Response } from "express";
import Assessment from "../models/Assessment";

export async function historyController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const assessments = await Assessment.find()
      .sort({ createdAt: -1 })
      .limit(20);
    res.status(200).json(assessments);
  } catch (error) {
    console.error("Failed to fetch history:", error);
    res.status(500).json({ error: "Failed to fetch assessment history" });
  }
}
