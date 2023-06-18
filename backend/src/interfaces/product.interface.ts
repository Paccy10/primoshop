import { Document } from "mongoose";

export interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}

export interface ReviewInput {
  user: string;
  name: string;
  rating: number;
  comment: string;
}

export interface ReviewDocument extends ReviewInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductInput {
  user: string;
  name: string;
  image: string;
  brand: String;
  category: string;
  description: string;
  price: number;
  countInStock: number;
}

export interface ProductDocument extends ProductInput, Document {
  reviews: ReviewDocument[];
  rating: number;
  numReviews: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewInput {
  rating: number;
  comment: string;
}
