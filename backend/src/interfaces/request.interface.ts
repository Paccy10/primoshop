import { Request } from "express";
import { UserDocument } from "./user.interface";

export interface CustomRequest extends Request {
  user: UserDocument | null;
}
