import mongoose from "mongoose";

import bcrypt from "bcryptjs";

const userSchema =
  mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
      },

      password: {
        type: String,
        required: true,
      },

      // ================= OTP VERIFICATION =================

      isVerified: {
        type: Boolean,
        default: false,
      },

      otp: {
        type: String,
      },

      otpExpiry: {
        type: Date,
      },
    },

    {
      timestamps: true,
    }
  );


// ================= MATCH PASSWORD =================

userSchema.methods.matchPassword =
  async function (
    enteredPassword
  ) {

    return await bcrypt.compare(
      enteredPassword,
      this.password
    );
  };


// ================= HASH PASSWORD =================

userSchema.pre(
  "save",

  async function (next) {

    // Only hash if modified
    if (
      !this.isModified(
        "password"
      )
    ) {

      return next();
    }

    try {

      const salt =
        await bcrypt.genSalt(
          10
        );

      this.password =
        await bcrypt.hash(
          this.password,
          salt
        );

      next();

    } catch (error) {

      next(error);
    }
  }
);

const User =
  mongoose.model(
    "User",
    userSchema
  );

export default User;