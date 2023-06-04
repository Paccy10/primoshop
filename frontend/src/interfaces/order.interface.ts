import { CartProduct } from "./product.interface";

export interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  name: string;
  quantity: number;
  image: string;
  price: number;
  product: string;
}

export interface PaymentResult {
  id: string;
  status: string;
  update_time: string;
  email_address: string;
}

export interface Order {
  _id: string;
  user: string;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentResult: PaymentResult;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  deliveredAt: Date;
  paidAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetOrder extends Omit<Order, "user"> {
  user: {
    name: string;
    email: string;
  };
}

export interface GetAdminOrder extends Omit<Order, "user"> {
  user: {
    id: string;
    name: string;
  };
}

export interface CartState {
  cartItems: CartProduct[];
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
}
