import express, { Express, Request, Response } from "express";
import products from "./data/products";

const port = 8000;
const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("API is running...");
});

app.get("/api/products", (req: Request, res: Response) => {
  res.json(products);
});

app.get("/api/products/:id", (req: Request, res: Response) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(port, () => console.log(`Server running on port ${port}`));
