import { Request, Response } from "express";
import Order from "../models/order.model";
import { OrderInput } from "../interfaces/order.interface";
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
  res.send("update Order To Paid");
};

export const updateOrderToDelivered = async (req: Request, res: Response) => {
  res.send("update Order To Delivered");
};

export const getOrders = async (req: Request, res: Response) => {
  res.send("get all orders");
};
