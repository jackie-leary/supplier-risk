import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface SupplierInput {
  name: string;
  country: string;
  industry: string;
}

export interface RiskProfile {
  overallRisk: "Low" | "Medium" | "High"; // MUST be exactly one of these three values, no other variations
  categories: {
    geopolitical: string;
    environmental: string;
    labor: string;
    regulatory: string;
  };
  summary: string;
  redFlags: string[];
}

export async function assessSupplierRisk(
  supplier: SupplierInput
): Promise<RiskProfile> {
  const prompt = `You are a supply chain risk analyst. Assess the risk of sourcing from the following supplier and return a JSON object only — no explanation, no markdown, just raw JSON.

Supplier:
- Name: ${supplier.name}
- Country: ${supplier.country}
- Industry: ${supplier.industry}

Return this exact shape:
{
  "overallRisk": "Low" | "Medium" | "High",
  "categories": {
    "geopolitical": "brief assessment",
    "environmental": "brief assessment",
    "labor": "brief assessment",
    "regulatory": "brief assessment"
  },
  "summary": "2-3 sentence narrative summary",
  "redFlags": ["flag1", "flag2"] // empty array if none
}`;

  const response = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 1024,
    tools: [{ type: "web_search_20250305", name: "web_search" }],
    messages: [{ role: "user", content: prompt }],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from Claude");
  }

  const cleaned = textBlock.text.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned) as RiskProfile;
}
