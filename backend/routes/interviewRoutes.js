import express from "express";

import protect from "../middleware/authMiddleware.js";

import { generateInterviewQuestions, getUserInterviews, getInterviewById, saveAnswer, evaluateAnswer } from "../controllers/interviewController.js";

const router = express.Router();

// Generate Questions
router.post("/generate", protect, generateInterviewQuestions);

// Get All User Interviews
router.get("/", protect, getUserInterviews);

// Get Interview By ID
router.get("/:id", protect, getInterviewById);

// Save Answer
router.put("/:id/answer", protect, saveAnswer);

// Evaluate Answer
router.put("/:id/evaluate", protect, evaluateAnswer);

export default router;