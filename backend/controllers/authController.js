import User from "../models/userModel.js";

import generateToken from "../utils/generateToken.js";

import sendOtpEmail from "../utils/sendOtpEmail.js";


// ================= REGISTER =================

export const registerUser =
  async (req, res) => {

    try {

      const {
        name,
        email,
        password,
      } = req.body;

      if (
        !name ||
        !email ||
        !password
      ) {

        return res.status(400).json({
          message:
            "Please fill all fields",
        });
      }

      const userExists =
        await User.findOne({
          email,
        });

      if (userExists) {

        return res.status(400).json({
          message:
            "User already exists",
        });
      }

      // Generate OTP
      const otp =
        Math.floor(
          100000 +
          Math.random() *
          900000
        ).toString();

      // Create User
      const user =
        await User.create({
          name,
          email,
          password,

          otp,

          otpExpiry:
            Date.now() +
            5 * 60 * 1000,
        });

      // Send OTP Email
      const emailSent =
      await sendOtpEmail(
        email,
        "Interview Ace Otp Verification",
        otp
      );

      if (!emailSent) {

        return res.status(500).json({
          message:
            "Failed to send OTP email",
        });
      }

      res.status(201).json({
        message:
          "OTP sent to your email",
        email:
          user.email,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };


// ================= VERIFY OTP =================

export const verifyOtp =
  async (req, res) => {

    try {

      const { email, otp } =
        req.body;

      const user =
        await User.findOne({
          email,
        });

      if (!user) {

        return res.status(404).json({
          message:
            "User not found",
        });
      }

      if (user.otp !== otp) {

        return res.status(400).json({
          message:
            "Invalid OTP",
        });
      }

      if (
        user.otpExpiry <
        Date.now()
      ) {

        return res.status(400).json({
          message:
            "OTP expired",
        });
      }

      user.isVerified = true;

      user.otp = null;

      user.otpExpiry = null;

      await user.save();

      res.status(200).json({
        message:
          "Email verified successfully",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "OTP verification failed",
      });
    }
  };


// ================= RESEND OTP =================

export const resendOtp =
  async (req, res) => {

    try {

      const { email } =
        req.body;

      const user =
        await User.findOne({
          email,
        });

      if (!user) {

        return res.status(404).json({
          message:
            "User not found",
        });
      }

      // Generate New OTP
      const otp =
        Math.floor(
          100000 +
          Math.random() *
          900000
        ).toString();

      user.otp = otp;

      user.otpExpiry =
        Date.now() +
        5 * 60 * 1000;

      await user.save();

      // Send OTP
      const sendEmail =
      await sendOtpEmail(
        email,
        "Interview Ace Otp Verification",
        otp
      );

      res.status(200).json({
        message:
          "OTP resent successfully",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Resend OTP failed",
      });
    }
  };


// ================= LOGIN =================

export const loginUser =
  async (req, res) => {

    try {

      const { email, password } =
        req.body;

      const user =
        await User.findOne({
          email,
        });

      if (
        user &&
        (await user.matchPassword(
          password
        ))
      ) {

        // Check Verification
        if (
          !user.isVerified
        ) {

          return res.status(401).json({
            message:
              "Please verify your email first",
          });
        }

        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token:
            generateToken(
              user._id
            ),
        });

      } else {

        res.status(401).json({
          message:
            "Invalid email or password",
        });
      }

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };


// ================= GET USER PROFILE =================

export const getUserProfile =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user._id
        );

      if (!user) {

        return res.status(404).json({
          message:
            "User not found",
        });
      }

      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };


// ================= UPDATE USER PROFILE =================

export const updateUserProfile =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user._id
        );

      if (!user) {

        return res.status(404).json({
          message:
            "User not found",
        });
      }

      user.name =
        req.body.name ||
        user.name;

      user.email =
        req.body.email ||
        user.email;

      if (
        req.body.password &&
        req.body.password.trim() !== ""
      ) {

        user.password =
          req.body.password;
      }

      const updatedUser =
        await user.save();

      res.status(200).json({
        _id:
          updatedUser._id,

        name:
          updatedUser.name,

        email:
          updatedUser.email,

        token:
          generateToken(
            updatedUser._id
          ),
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Profile update failed",
      });
    }
  };