import { Request, Response } from "express";
import Assessment from "../models/Assessment";

export async function historyController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const skip = (page - 1) * limit;

    const [assessments, total] = await Promise.all([
      Assessment.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Assessment.countDocuments(),
    ]);

    res.status(200).json({
      assessments,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Failed to fetch history:", error);
    res.status(500).json({ error: "Failed to fetch assessment history" });
  }
}
