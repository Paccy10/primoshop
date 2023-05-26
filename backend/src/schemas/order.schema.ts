import { object, string, array, number } from "yup";

export const addOrderSchema = object({
  body: object({
    totalPrice: number().positive().required().label("Total Price"),
    shippingPrice: number()
      .positive()
      .min(0)
      .required()
      .label("Shipping Price"),
    taxPrice: number().positive().required().label("Tax Price"),
    itemsPrice: number().positive().required().label("Items Price"),
    paymentMethod: string().required().label("paymentMethod"),
    shippingAddress: object({
      address: string().required().label("shippingAddress.address"),
      city: string().required().label("shippingAddress.city"),
      postalCode: string()
        .required()
        .length(5)
        .matches(/^[0-9]{5}/, "Postal code must be only numbers")
        .label("shippingAddress.postalCode"),
      country: string().required().label("shippingAddress.country"),
    }).required(),
    orderItems: array()
      .of(
        object({
          name: string().required().label("Name"),
          quantity: number()
            .integer()
            .positive()
            .required()
            .min(1)
            .label("Quantity"),
          image: string().required().label("Image"),
          price: number().positive().required().label("Price"),
          product: string().required().label("Product"),
        })
      )
      .required()
      .min(1)
      .label("Order Items"),
  }),
});
