import { model, Schema } from "mongoose";
import { EOrder } from "./order.interface";

const orderSchema = new Schema<EOrder>({
  email: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

export const Order = model<EOrder>("Order", orderSchema);
