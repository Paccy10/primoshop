import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db";
import productRoutes from "./routes/product.routes";
import Logger from "./library/logger";
import { errorHandler, notFound } from "./middlewares/errorHandler";

connectDB();

const port = process.env.PORT || 5000;
const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => Logger.info(`Server running on port ${port}`));
