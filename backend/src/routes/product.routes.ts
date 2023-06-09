import express from "express";
import asyncHandler from "../middlewares/asyncHandler";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProductById,
  getProducts,
  getTopProducts,
  updateProduct,
} from "../controllers/product.controller";
import { admin, protect } from "../middlewares/auth";

const router = express.Router();

router.get("/", asyncHandler(getProducts));
router.post("/", protect, admin, asyncHandler(createProduct));
router.get("/top", asyncHandler(getTopProducts));
router.get("/:id", asyncHandler(getProductById));
router.put("/:id", protect, admin, asyncHandler(updateProduct));
router.delete("/:id", protect, admin, asyncHandler(deleteProduct));
router.post("/:id/reviews", protect, asyncHandler(createProductReview));

export default router;
