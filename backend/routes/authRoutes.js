import express from "express";

import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  verifyOtp,
  resendOtp,
} from "../controllers/authController.js";

import protect from "../middleware/authMiddleware.js";

const router =
  express.Router();


// ================= REGISTER =================

router.post(
  "/register",
  registerUser
);


// ================= VERIFY OTP =================

router.post(
  "/verify-otp",
  verifyOtp
);


// ================= RESEND OTP =================

router.post(
  "/resend-otp",
  resendOtp
);


// ================= LOGIN =================

router.post(
  "/login",
  loginUser
);


// ================= GET PROFILE =================

router.get(
  "/profile",
  protect,
  getUserProfile
);


// ================= UPDATE PROFILE =================

router.put(
  "/profile",
  protect,
  updateUserProfile
);

export default router;