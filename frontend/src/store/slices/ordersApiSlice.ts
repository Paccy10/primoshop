import { apiSlice } from "./apiSlice";
import { ORDERS_URL } from "../../constants";
import {
  CartState,
  GetOrder,
  Order,
  PaymentResult,
} from "../../interfaces/order.interface";
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

    getOrderDetails: builder.query<GetOrder, string>({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    payOrder: builder.mutation<
      Order,
      { orderId: string; paymentResult: PaymentResult }
    >({
      query: ({ orderId, paymentResult }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: paymentResult,
      }),
    }),
    getMyOrders: builder.query<Order[], void>({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useAddOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetMyOrdersQuery,
} = ordersApiSlice;
