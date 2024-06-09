import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import productSchema from "./product.validation";

const createProduct = async (req: Request, res: Response) => {
  try {
    // const {product: productData} = req.body;
    // const zodParsedData = productSchema.parse(productData);

    const validation = productSchema.parse(req.body);

    // if (!validation.success) {
    //   return res.status(400).json({ errors: validation.error.format() });
    // }

    // const { name, description, price, category, tags, variants, inventory } =
    //   validation.data;

    const result = await ProductServices.createProduct(validation);
    res.status(200).json({
      success: true,
      message: "Product created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product could not be created",
      data: error,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductsFromDB();
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Products could not be fetched.",
      data: error,
    });
  }
};

const getProductByID = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getProductByIDFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product could not be fetched.",
      data: error,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getProductByID,
};
