import { object, string } from "yup";

export const loginUserSchema = object({
  body: object().shape({
    email: string().required().email().label("Email"),
    password: string().required().label("Password"),
  }),
});

export const registerUserSchema = object({
  body: object({
    name: string().required().label("Name"),
    email: string().required().email().label("Email"),
    password: string()
      .required()
      .min(6)
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/,
        "Weak Password - Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character"
      )
      .label("Password"),
  }),
});
