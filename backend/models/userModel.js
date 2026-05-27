import mongoose from "mongoose";

import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
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


// Match Password
userSchema.methods.matchPassword =
  async function (enteredPassword) {

    return await bcrypt.compare(
      enteredPassword,
      this.password
    );
  };


// Hash Password
userSchema.pre(
  "save",

  async function (next) {

    if (!this.isModified("password")) {

      return next();
    }

    const salt =
      await bcrypt.genSalt(10);

    this.password =
      await bcrypt.hash(
        this.password,
        salt
      );

    next();
  }
);

const User = mongoose.model(
  "User",
  userSchema
);

export default User;