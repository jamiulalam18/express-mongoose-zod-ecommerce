import { EOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrder = async (order: EOrder) => {
  const result = await Order.create(order);
  return result;
};

const getOrdersFromDB = async () => {
  const result = await Order.find();
  return result;
};
const getOrderByEmailFromDB = async (email: string) => {
  const result = await Order.find({ email: email });
  return result;
};

export const OrdersServices = {
  createOrder,
  getOrderByEmailFromDB,
  getOrdersFromDB
};
