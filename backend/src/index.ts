import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import assessRouter from "./routes/assess";
import historyRouter from "./routes/history";

const app = express();
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(
  cors({
    origin: ["http://localhost:5173", "https://supplier-risk-zeta.vercel.app"],
  })
);
app.use(express.json());
app.use("/api/assess", assessRouter);
app.use("/api/history", historyRouter);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
