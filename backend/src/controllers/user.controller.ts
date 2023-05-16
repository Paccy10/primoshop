import { Request, Response } from "express";
import { omit } from "lodash";
import User from "../models/user.model";
import { LoginInput, UserInput } from "../interfaces/user.interface";
import generateToken from "../utils/generateToken";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body as LoginInput;
  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    generateToken(res, user._id);
    const data = omit(user.toJSON(), "password");

    return res.json(data);
  }

  res.status(401);
  throw new Error("Invalid email or password");
};

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body as UserInput;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(409);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });
  generateToken(res, user._id);
  const data = omit(user.toJSON(), "password");

  res.status(201).json(data);
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
