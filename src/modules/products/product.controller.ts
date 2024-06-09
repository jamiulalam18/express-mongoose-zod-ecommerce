import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import productSchema from "./product.validation";

const createProduct = async (req: Request, res: Response) => {
  try {
    const validationData = await productSchema.parse(req.body);
    const result = await ProductServices.createProduct(validationData);
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
    const { searchTerm } = req.query;
    if (searchTerm) {
      const result = await ProductServices.searchProductFromDB(
        searchTerm as string
      );
      if (result.length > 0) {
        res.status(200).json({
          success: true,
          message: `Products matching search term '${searchTerm}' fetched successfully!`,
          data: result,
        });
      } else {
        res.status(200).json({
            success: true,
            message: `No products matching search term '${searchTerm}' found!`,
            data: result,
          });
      }
    } else {
      const result = await ProductServices.getAllProductsFromDB();
      res.status(200).json({
        success: true,
        message: "Products fetched successfully!",
        data: result,
      });
    }
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

const updateProductByID = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updatedData = req.body;
    const validationData = await productSchema.parse(updatedData);
    const result = await ProductServices.updateProductByIDFromDB(
      productId,
      validationData
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product could not be updated.",
      data: error,
    });
  }
};

const deleteProductByID = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    await ProductServices.deleteProductByIDFromDB(productId);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product could not be deleted.",
      data: null,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getProductByID,
  updateProductByID,
  deleteProductByID,
};
