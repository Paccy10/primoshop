import { CartProduct } from "../interfaces/product.interface";
import { addDecimals } from "./utils";

export const updateCart = (state: any) => {
  // Calculate items price
  const itemsPrice = addDecimals(
    state.cartItems.reduce(
      (price: number, item: CartProduct) => price + item.price * item.quantity,
      0
    )
  );
  state.itemsPrice = parseFloat(itemsPrice);

  // Calculate shipping price (If order is over $100 then free, else $10 shipping)
  const shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
  state.shippingPrice = parseFloat(shippingPrice);

  // Calculate tax price (15% rax)
  const taxPrice = addDecimals(0.15 * state.itemsPrice);
  state.taxPrice = parseFloat(taxPrice);

  // Calculate total price
  const totalPrice = addDecimals(
    state.itemsPrice + state.shippingPrice + state.taxPrice
  );
  state.totalPrice = parseFloat(totalPrice);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
