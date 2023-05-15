import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";
import asyncHandler from "../middlewares/asyncHandler";

const router = express.Router();

router.get("/", asyncHandler(getUsers));
router.post("/", asyncHandler(registerUser));
router.post("/logout", asyncHandler(logoutUser));
router.post("/login", asyncHandler(loginUser));
router.get("/profile", asyncHandler(getUserProfile));
router.put("/profile", asyncHandler(updateUserProfile));
router.get("/:id", asyncHandler(getUserById));
router.put("/:id", asyncHandler(updateUser));
router.delete("/:id", asyncHandler(deleteUser));

export default router;
