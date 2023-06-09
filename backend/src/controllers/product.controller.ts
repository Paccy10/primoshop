import { Request, Response } from "express";
import Product from "../models/product.model";
import { CustomRequest } from "../interfaces/request.interface";

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.find({});
  res.status(200).json(products);
};

export const getProductById = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    const message = "Product not found";
    res.status(404).json({ message });
    throw new Error(message);
  }

  res.status(200).json(product);
};

export const createProduct = async (req: CustomRequest, res: Response) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user?._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};
