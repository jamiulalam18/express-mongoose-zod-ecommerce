import { z } from "zod";

// Define the variant schema with validation messages
const variantSchema = z.object({
  type: z.string().min(1,{ message: "Type is required" }),
  value: z.string().min(1,{ message: "Value is required" }),
});

// Define the inventory schema with validation messages
const inventorySchema = z.object({
  quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
  inStock: z
    .boolean()
    .refine((val) => val !== null, { message: "InStock is required" }),
});

// Define the product schema with validation messages
const productSchema = z.object({
  name: z.string().min(1,{ message: "Name is required" }),
  description: z.string().min(1,{ message: "Description is required" }),
  price: z.number().min(0, { message: "Price must be a positive number" }),
  category: z.string().min(1,{ message: "Category is required" }),
  tags: z
    .array(z.string().min(1,{ message: "Tag cannot be empty" })),
  variants: z
    .array(variantSchema)
    .min(1,{ message: "At least one variant is required" }),
  inventory: inventorySchema,
});

export default productSchema;

