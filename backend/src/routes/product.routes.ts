import express, { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import Product from "../models/product.model";
const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const products = await Product.find({});
    res.json(products);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  })
);

export default router;
