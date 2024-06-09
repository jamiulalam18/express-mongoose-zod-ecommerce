import { z } from "zod";

const orderSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .min(1, { message: "Email is required" }),
  productId: z.string().min(1, { message: "Product ID is required" }),
  price: z.number().min(0, { message: "Price must be a positive number" }),
  quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
});

export default orderSchema;
