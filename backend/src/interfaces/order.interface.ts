import { Document } from "mongoose";

interface OrderItem {
  name: string;
  quantity: number;
  image: string;
  price: number;
  product: string;
}

export interface OrderInput {
  user: string;
  orderItems: OrderItem[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
}

export interface OrderDocument extends OrderInput, Document {
  paymentResult: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  isPaid: Boolean;
  isDelivered: Boolean;
  deliveredAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
