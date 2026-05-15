import mongoose, { Schema, Document } from "mongoose";
import { RiskProfile, SupplierInput } from "../services/claudeService";

export interface IAssessment extends Document {
  supplier: SupplierInput;
  riskProfile: RiskProfile;
  createdAt: Date;
}

const AssessmentSchema = new Schema(
  {
    supplier: {
      name: { type: String, required: true },
      country: { type: String, required: true },
      industry: { type: String, required: true },
    },
    riskProfile: {
      overallRisk: {
        type: String,
        enum: ["Low", "Medium", "High"],
        required: true,
      },
      categories: {
        geopolitical: String,
        environmental: String,
        labor: String,
        regulatory: String,
      },
      summary: String,
      redFlags: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IAssessment>("Assessment", AssessmentSchema);
