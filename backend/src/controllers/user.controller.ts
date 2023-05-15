import { Request, Response } from "express";
import User from "../models/user.model";

export const loginUser = (req: Request, res: Response) => {
  res.send("login user");
};

export const registerUser = (req: Request, res: Response) => {
  res.send("register user");
};

export const logoutUser = (req: Request, res: Response) => {
  res.send("logout user");
};

export const getUserProfile = (req: Request, res: Response) => {
  res.send("get user profile");
};

export const updateUserProfile = (req: Request, res: Response) => {
  res.send("update user profile");
};

// Admin routes
export const getUsers = (req: Request, res: Response) => {
  res.send("get all users");
};

export const getUserById = (req: Request, res: Response) => {
  res.send("get user by id");
};

export const deleteUser = (req: Request, res: Response) => {
  res.send("delete user");
};

export const updateUser = (req: Request, res: Response) => {
  res.send("update user");
};
