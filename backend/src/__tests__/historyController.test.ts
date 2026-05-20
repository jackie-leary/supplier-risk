jest.mock("../models/Assessment", () => ({
  find: jest.fn().mockReturnValue({
    sort: jest.fn().mockReturnValue({
      skip: jest.fn().mockReturnValue({
        limit: jest.fn().mockResolvedValue([
          {
            _id: "1",
            supplier: { name: "Acme", country: "US", industry: "Tech" },
          },
          {
            _id: "2",
            supplier: {
              name: "Globex",
              country: "DE",
              industry: "Manufacturing",
            },
          },
        ]),
      }),
    }),
  }),
  countDocuments: jest.fn().mockResolvedValue(2),
}));

import { historyController } from "../controllers/historyController";
import { Request, Response } from "express";

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("historyController", () => {
  it("returns paginated assessments with default page and limit", async () => {
    const req = { query: {} } as Request;
    const res = mockResponse();

    await historyController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        page: 1,
        totalPages: 1,
        total: 2,
      })
    );
  });

  it("calculates totalPages correctly", async () => {
    const Assessment = require("../models/Assessment");
    Assessment.countDocuments.mockResolvedValue(11);

    const req = { query: { page: "1", limit: "5" } } as unknown as Request;
    const res = mockResponse();

    await historyController(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        totalPages: 3,
      })
    );
  });

  it("returns 500 on database error", async () => {
    const Assessment = require("../models/Assessment");
    Assessment.find.mockReturnValue({
      sort: jest.fn().mockReturnValue({
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockRejectedValue(new Error("DB error")),
        }),
      }),
    });

    const req = { query: {} } as Request;
    const res = mockResponse();

    await historyController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
