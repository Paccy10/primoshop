import { Request, Response } from "express";
import Order from "../models/order.model";
import { OrderInput, PaymentResultInput } from "../interfaces/order.interface";
import { CustomRequest } from "../interfaces/request.interface";

export const addOrder = async (req: CustomRequest, res: Response) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body as OrderInput;

  const order = await Order.create({
    orderItems,
    user: req.user?.id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  res.status(201).json(order);
};

export const getMyOrders = async (req: CustomRequest, res: Response) => {
  const orders = await Order.find({ user: req.user?._id });
  res.status(200).json(orders);
};

export const getOrderById = async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  res.status(200).json(order);
};

export const updateOrderToPaid = async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  const { id, status, update_time, email_address } =
    req.body as PaymentResultInput;
  order.isPaid = true;
  order.paidAt = new Date();
  order.paymentResult = { id, status, update_time, email_address };

  const updatedOrder = await order.save();
  res.status(200).json(updatedOrder);
};

export const updateOrderToDelivered = async (req: Request, res: Response) => {
  res.send("update Order To Delivered");
};

export const getOrders = async (req: Request, res: Response) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.status(200).json(orders);
};
