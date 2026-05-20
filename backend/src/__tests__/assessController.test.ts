jest.mock("../services/claudeService", () => ({
  assessSupplierRisk: jest.fn(),
}));

const mockSave = jest.fn().mockResolvedValue(true);

jest.mock("../models/Assessment", () => {
  return jest.fn().mockImplementation(() => ({
    save: mockSave,
  }));
});

import { assessController } from "../controllers/assessController";
import { assessSupplierRisk } from "../services/claudeService";
import { Request, Response } from "express";

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = (body: object) => ({ body } as Request);

const mockRiskProfile = {
  overallRisk: "High" as const,
  categories: {
    geopolitical: "High risk",
    environmental: "Medium risk",
    labor: "High risk",
    regulatory: "Medium risk",
  },
  summary: "This supplier is high risk.",
  redFlags: ["Child labor reported"],
};

describe("assessController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns 400 if name is missing", async () => {
    const req = mockRequest({ country: "Bangladesh", industry: "Textiles" });
    const res = mockResponse();

    await assessController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("returns 400 if country is missing", async () => {
    const req = mockRequest({ name: "Acme", industry: "Textiles" });
    const res = mockResponse();

    await assessController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("returns 400 if industry is missing", async () => {
    const req = mockRequest({ name: "Acme", country: "Bangladesh" });
    const res = mockResponse();

    await assessController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("returns the risk profile on success", async () => {
    (assessSupplierRisk as jest.Mock).mockResolvedValue(mockRiskProfile);

    const req = mockRequest({
      name: "Acme",
      country: "Bangladesh",
      industry: "Textiles",
    });
    const res = mockResponse();

    await assessController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        overallRisk: "High",
      })
    );
  });

  it("returns 500 if Claude service throws", async () => {
    (assessSupplierRisk as jest.Mock).mockRejectedValue(new Error("API error"));

    const req = mockRequest({
      name: "Acme",
      country: "Bangladesh",
      industry: "Textiles",
    });
    const res = mockResponse();

    await assessController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
