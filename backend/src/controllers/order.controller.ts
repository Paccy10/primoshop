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

export const getMyOrders = async (req: Request, res: Response) => {
  res.send("get my orders");
};

export const getOrderById = async (req: Request, res: Response) => {
  res.send("get oder by id");
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
