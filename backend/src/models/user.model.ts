import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { UserDocument } from "../interfaces/user.interface";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (password: string) {
  const user = this as UserDocument;
  return await bcrypt.compare(password, user.password);
};

export default model<UserDocument>("User", userSchema);
