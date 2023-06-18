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
  reviews: {
    _id: string;
    name: string;
    rating: number;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CartProduct extends Product {
  quantity: number;
}

export interface ProductInput {
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
}

export interface ReviewInput {
  rating: number;
  comment: string;
}
