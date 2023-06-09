import { object, string } from "yup";

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/;
const weakPasswordMessage =
  "Weak Password - Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character";

export const loginUserSchema = object({
  body: object().shape({
    email: string().required().email().label("Email"),
    password: string().required().label("Password"),
  }),
});

export const registerUserSchema = object({
  body: object({
    password: string()
      .required()
      .min(6)
      .matches(passwordRegex, weakPasswordMessage)
      .label("Password"),
  }),
  email: string().required().email().label("Email"),
  name: string().required().label("Name"),
});

export const updateUserSchema = object({
  body: object({
    password: string()
      .min(6)
      .matches(passwordRegex, weakPasswordMessage)
      .label("Password"),
  }),
});
