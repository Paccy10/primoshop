import { Document } from "mongoose";

export interface UserInput {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

export interface UserDocument extends UserInput, Document {
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

export interface LoginInput {
  email: string;
  password: string;
}
