import { createSlice } from "@reduxjs/toolkit";
import { CartProduct } from "../../interfaces/product.interface";
import { updateCart } from "../../helpers/cartUtils";
import { ShippingAddress } from "../../interfaces/order.interface";

interface CartState {
  cartItems: CartProduct[];
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
}

const initialState: CartState = localStorage.getItem("cart")
  ? JSON.parse(`${localStorage.getItem("cart")}`)
  : {
      cartItems: [],
      itemsPrice: 0,
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: 0,
      shippingAddress: {},
      paymentMethod: "PayPal",
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item: CartProduct = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
  },
});

export const { addToCart, removeFromCart, saveShippingAddress } =
  cartSlice.actions;
export default cartSlice;
