import { object, string, array, number } from "yup";

export const addOrderSchema = object({
  body: object({
    totalPrice: number().positive().required(),
    shippingPrice: number().positive().min(0).required(),
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
          name: string().required(),
          quantity: number().integer().positive().required().min(1),
          image: string().required(),
          price: number().positive().required(),
          product: string().required(),
        })
      )
      .required()
      .min(1)
      .label("Order Items"),
  }),
});

export const paymentResultSchema = object({
  body: object({
    id: string().required(),
    status: string().required(),
    update_time: string().required(),
    email_address: string().required(),
  }),
});
