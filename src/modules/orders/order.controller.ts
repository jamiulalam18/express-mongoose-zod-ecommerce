import { Request, Response } from "express";
import { Product } from "../products/product.model";
import orderSchema from "./order.validation";
import { OrdersServices } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const productsData = await Product.findById(orderData.productId);
    if (!productsData) {
      res.status(500).json({
        success: false,
        message: "No Product Found",
      });
      return;
    }
    if (
      orderData.quantity > productsData.inventory.quantity ||
      !productsData.inventory.inStock
    ) {
      res.status(400).json({
        success: false,
        message: "Insufficient quantity",
      });
      return;
    }
    productsData.inventory.quantity -= orderData.quantity;
    productsData.inventory.inStock = productsData.inventory.quantity > 0;
    await productsData.save();

    const orderValidationData = await orderSchema.parse(orderData);
    const result = await OrdersServices.createOrder(orderValidationData);
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getOrders = async (req: Request, res: Response) => {
    try {
      const email = req.query.email;
      if (email) {
        const result = await OrdersServices.getOrderByEmailFromDB(
          email as string,
        );
        if (!result.length) {
          return res.status(200).json({
            success: true,
            message: "No Order Found",
          });
        }
        return res.status(200).json({
          success: true,
          message: "Orders fetched successfully for user email!",
          data: result,
        });
      } else {
        const result = await OrdersServices.getOrdersFromDB();
        return res.status(200).json({
          success: true,
          message: "Orders fetched successfully!",
          data: result,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

export const OrderController = {
  createOrder,
  getOrders
};
