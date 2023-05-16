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
import { protect, admin } from "../middlewares/auth";
import validateRequest from "../middlewares/validateRequest";
import { loginUserSchema, registerUserSchema } from "../schemas/user.schema";

const router = express.Router();

router.get("/", protect, admin, asyncHandler(getUsers));
router.post(
  "/",
  validateRequest(registerUserSchema),
  asyncHandler(registerUser)
);
router.post("/logout", protect, asyncHandler(logoutUser));
router.post(
  "/login",
  validateRequest(loginUserSchema),
  asyncHandler(loginUser)
);
router.get("/profile", protect, asyncHandler(getUserProfile));
router.put("/profile", protect, asyncHandler(updateUserProfile));
router.get("/:id", protect, admin, asyncHandler(getUserById));
router.put("/:id", protect, admin, asyncHandler(updateUser));
router.delete("/:id", protect, admin, asyncHandler(deleteUser));

export default router;
