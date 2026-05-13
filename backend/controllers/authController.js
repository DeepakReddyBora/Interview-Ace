import User from "../models/userModel.js";

import generateToken from "../utils/generateToken.js";


// ================= REGISTER =================

export const registerUser = async (
  req,
  res
) => {

  try {

    const { name, email, password } =
      req.body;

    if (
      !name ||
      !email ||
      !password
    ) {

      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    const userExists =
      await User.findOne({ email });

    if (userExists) {

      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// ================= LOGIN =================

export const loginUser = async (
  req,
  res
) => {

  try {

    const { email, password } =
      req.body;

    const user = await User.findOne({
      email,
    });

    if (
      user &&
      (await user.matchPassword(password))
    ) {

      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
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
      message: "Server Error",
    });
  }
};

// ================= GET USER PROFILE =================

export const getUserProfile = async (
  req,
  res
) => {

  try {

    const user = await User.findById(
      req.user._id
    ).select("-password");

    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};