import express from "express";
import asyncHandler from "../middlewares/asyncHandler";
import {
  createProduct,
  getProductById,
  getProducts,
} from "../controllers/product.controller";
import { admin, protect } from "../middlewares/auth";

const router = express.Router();

router.get("/", asyncHandler(getProducts));
router.post("/", protect, admin, asyncHandler(createProduct));
router.get("/:id", asyncHandler(getProductById));

export default router;
