import { Request, Response } from "express";
import Product, { Review } from "../models/product.model";
import { CustomRequest } from "../interfaces/request.interface";
import { ProductInput, ReviewInput } from "../interfaces/product.interface";

export const getProducts = async (req: Request, res: Response) => {
  const pageSize = Number(req.query.pageSize) || 20;
  const page = Number(req.query.page) || 1;
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};
  const count = await Product.countDocuments({ ...keyword });

  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) });
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

export const updateProduct = async (req: Request, res: Response) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body as ProductInput;

  const product = await Product.findById(req.params.id);

  if (!product) {
    const message = "Product not found";
    res.status(404).json({ message });
    throw new Error(message);
  }

  product.name = name || product.name;
  product.price = price || product.price;
  product.description = description || product.description;
  product.image = image || product.image;
  product.brand = brand || product.brand;
  product.category = category || product.category;
  product.countInStock = countInStock || product.countInStock;

  const updatedProduct = await product.save();
  res.status(200).json(updatedProduct);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    const message = "Product not found";
    res.status(404).json({ message });
    throw new Error(message);
  }

  await Product.deleteOne({ _id: product._id });
  res.status(200).json({ message: "Product deleted successfully" });
};

export const createProductReview = async (
  req: CustomRequest,
  res: Response
) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    const message = "Product not found";
    res.status(404).json({ message });
    throw new Error(message);
  }

  const { rating, comment } = req.body as ReviewInput;

  const hasReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user?._id.toString()
  );

  if (hasReviewed) {
    const message = "Product already reviewed";
    res.status(404).json({ message });
    throw new Error(message);
  }

  const review = new Review({
    name: req.user?.name,
    rating,
    comment,
    user: req.user?._id,
  });
  product.reviews.push(review);
  product.numReviews = product.reviews.length;
  product.rating =
    product.reviews.reduce((acc, review) => acc + review.rating, 0) /
    product.reviews.length;
  await product.save();
  res.status(200).json({ message: "Review added successfully" });
};

export const getTopProducts = async (req: Request, res: Response) => {
  const products = await Product.find().sort({ rating: -1 }).limit(3);
  res.status(200).json(products);
};
