import dotenv from "dotenv";
import users from "../src/data/users";
import products from "../src/data/products";
import User from "../src/models/user.model";
import Product from "../src/models/product.model";
import Order from "../src/models/order.model";
import { connectDB } from "../src/config/db";
import Logger from "../src/library/logger";

dotenv.config();

const importData = async () => {
  try {
    await connectDB();
    // Delete all of the orders, products and users
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Seed the users
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => ({
      ...product,
      user: adminUser,
    }));
    await Product.insertMany(sampleProducts);

    Logger.info("Data Imported!!!");
    process.exit();
  } catch (error: any) {
    Logger.error(error.message);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    Logger.info("Data Destroyed!!!");
    process.exit();
  } catch (error: any) {
    Logger.error(error.message);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
