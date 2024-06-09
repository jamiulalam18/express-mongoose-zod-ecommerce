import express, { Request, Response } from "express";
import { Product } from "./product.model";
import { ProductControllers } from "./product.controller";

const router = express.Router();

router.post("/", ProductControllers.createProduct);
router.get("/", ProductControllers.getAllProducts);
router.get("/:productId", ProductControllers.getProductByID);
router.put("/:productId", ProductControllers.updateProductByID);


export const ProductRoutes = router;
