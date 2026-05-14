import express from "express";

import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/authController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();


// Register

router.post(
  "/register",
  registerUser
);


// Login

router.post(
  "/login",
  loginUser
);


// Get Profile

router.get(
  "/profile",
  protect,
  getUserProfile
);


// Update Profile

router.put(
  "/profile",
  protect,
  updateUserProfile
);

export default router;