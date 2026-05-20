jest.mock("../services/claudeService", () => ({
  assessSupplierRisk: jest.fn(),
}));

import { normalizeRisk } from "../controllers/assessController";

describe("normalizeRisk", () => {
  it('returns High for "High"', () => {
    expect(normalizeRisk("High")).toBe("High");
  });

  it('returns High for "Medium-High"', () => {
    expect(normalizeRisk("Medium-High")).toBe("High");
  });

  it('returns Low for "Low"', () => {
    expect(normalizeRisk("Low")).toBe("Low");
  });

  it('returns Low for "Very Low"', () => {
    expect(normalizeRisk("Very Low")).toBe("Low");
  });

  it('returns Medium for "Medium"', () => {
    expect(normalizeRisk("Medium")).toBe("Medium");
  });

  it("returns Medium for an unrecognized value", () => {
    expect(normalizeRisk("Unknown")).toBe("Medium");
  });
});
