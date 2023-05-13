import mongoose from "mongoose";
import Logger from "../library/logger";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}`);
    Logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    Logger.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
