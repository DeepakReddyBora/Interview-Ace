import express from "express";

import protect from "../middleware/authMiddleware.js";

import upload from "../config/multer.js";

import { analyzeResume, matchResumeWithJob } from "../controllers/resumeController.js";

const router = express.Router();

router.post("/analyze", protect, upload.single("resume"), analyzeResume);
router.post("/match", protect, upload.single("resume"), matchResumeWithJob);

export default router;