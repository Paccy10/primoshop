import express from "express";
import {
  addOrder,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from "../controllers/order.controller";
import asyncHandler from "../middlewares/asyncHandler";
import { protect, admin } from "../middlewares/auth";
import validateRequest from "../middlewares/validateRequest";
import { addOrderSchema, paymentResultSchema } from "../schemas/order.schema";

const router = express.Router();

router.get("/", protect, admin, asyncHandler(getOrders));
router.post(
  "/",
  protect,
  validateRequest(addOrderSchema),
  asyncHandler(addOrder)
);
router.get("/mine", protect, asyncHandler(getMyOrders));
router.get("/:id", protect, asyncHandler(getOrderById));
router.put(
  "/:id/pay",
  protect,
  validateRequest(paymentResultSchema),
  asyncHandler(updateOrderToPaid)
);
router.put(
  "/:id/deliver",
  protect,
  admin,
  asyncHandler(updateOrderToDelivered)
);

export default router;
