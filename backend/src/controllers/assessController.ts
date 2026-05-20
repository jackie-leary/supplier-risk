import { Request, Response } from "express";
import { assessSupplierRisk, SupplierInput } from "../services/claudeService";
import Assessment from "../models/Assessment";

// for unexpected values from the API
export const normalizeRisk = (risk: string): "Low" | "Medium" | "High" => {
  if (risk.toLowerCase().includes("high")) return "High";
  if (risk.toLowerCase().includes("low")) return "Low";
  return "Medium";
};

export async function assessController(
  req: Request,
  res: Response
): Promise<void> {
  const { name, country, industry } = req.body;

  if (!name || !country || !industry) {
    res.status(400).json({ error: "name, country, and industry are required" });
    return;
  }

  try {
    const supplier: SupplierInput = { name, country, industry };
    const riskProfile = await assessSupplierRisk(supplier);

    riskProfile.overallRisk = normalizeRisk(riskProfile.overallRisk);

    const assessment = new Assessment({ supplier, riskProfile });
    await assessment.save();

    res.status(200).json(riskProfile);
  } catch (error) {
    console.error("Assessment failed:", error);
    res.status(500).json({ error: "Failed to assess supplier risk" });
  }
}
