import { apiSlice } from "./apiSlice";
import { ORDERS_URL } from "../../constants";
import { CartState, Order } from "../../interfaces/order.interface";
import _ from "lodash";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addOrder: builder.mutation<Order, CartState>({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: {
          ..._.omit(order, "cartItems"),
          orderItems: order.cartItems.map((item) => ({
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
            product: item._id,
          })),
        },
      }),
    }),
  }),
});

export const { useAddOrderMutation } = ordersApiSlice;
