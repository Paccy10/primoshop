import { omit } from "lodash";
import { UserDocument } from "../interfaces/user.interface";

export const getUserData = (user: UserDocument) => {
  return omit(user.toJSON(), "password");
};
