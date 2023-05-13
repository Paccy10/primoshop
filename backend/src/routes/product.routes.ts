import express from "express";
import asyncHandler from "../middlewares/asyncHandler";
import { getProductById, getProducts } from "../controllers/product.controller";
const router = express.Router();

router.get("/", asyncHandler(getProducts));
router.get("/:id", asyncHandler(getProductById));

export default router;
