import dotenv from "dotenv";

dotenv.config();
console.log(
  "EMAIL USER:",
  process.env.EMAIL_USER
);
console.log(
  "EMAIL PASS EXISTS:",
  !!process.env.EMAIL_PASS
);

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import resumeRoutes from "./routes/resumeRoutes.js";

import authRoutes from "./routes/authRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Interview Ace API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/interview", interviewRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});