import express, { Request, Response } from "express";
import { ProductRoutes } from "./modules/products/product.route";
import { OrderRouter } from "./modules/orders/order.route";
const app = express();
//parsers
app.use(express.json());
app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Sample E-commerce API");
});

// Error handle for unused route
app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
