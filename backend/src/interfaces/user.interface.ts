import { Document } from "mongoose";

export interface UserInput {
  name: string;
  email: string;
  password: string;
}

export interface UserDocument extends UserInput, Document {
  createdAt: Date;
  updatedAt: Date;
}
