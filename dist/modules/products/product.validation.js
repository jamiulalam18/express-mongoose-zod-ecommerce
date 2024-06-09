"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Define the variant schema with validation messages
const variantSchema = zod_1.z.object({
    type: zod_1.z.string().min(1, { message: "Type is required" }),
    value: zod_1.z.string().min(1, { message: "Value is required" }),
});
// Define the inventory schema with validation messages
const inventorySchema = zod_1.z.object({
    quantity: zod_1.z.number().min(1, { message: "Quantity must be at least 1" }),
    inStock: zod_1.z
        .boolean()
        .refine((val) => val !== null, { message: "InStock is required" }),
});
// Define the product schema with validation messages
const productSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "Name is required" }),
    description: zod_1.z.string().min(1, { message: "Description is required" }),
    price: zod_1.z.number().min(0, { message: "Price must be a positive number" }),
    category: zod_1.z.string().min(1, { message: "Category is required" }),
    tags: zod_1.z
        .array(zod_1.z.string().min(1, { message: "Tag cannot be empty" })),
    variants: zod_1.z
        .array(variantSchema)
        .min(1, { message: "At least one variant is required" }),
    inventory: inventorySchema,
});
exports.default = productSchema;
