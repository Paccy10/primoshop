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
