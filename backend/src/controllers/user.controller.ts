import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { LoginInput } from "../interfaces/user.interface";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body as LoginInput;
  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    const token = jwt.sign({ userId: user._id }, `${process.env.SECRET_KEY}`, {
      expiresIn: "30d",
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }

  res.status(401);
  throw new Error("Invalid email or password");
};

export const registerUser = async (req: Request, res: Response) => {
  res.send("register user");
};

export const logoutUser = async (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.json({ message: "Logged out successfully" });
};

export const getUserProfile = async (req: Request, res: Response) => {
  res.send("get user profile");
};

export const updateUserProfile = async (req: Request, res: Response) => {
  res.send("update user profile");
};

// Admin routes
export const getUsers = async (req: Request, res: Response) => {
  res.send("get all users");
};

export const getUserById = async (req: Request, res: Response) => {
  res.send("get user by id");
};

export const deleteUser = async (req: Request, res: Response) => {
  res.send("delete user");
};

export const updateUser = async (req: Request, res: Response) => {
  res.send("update user");
};
