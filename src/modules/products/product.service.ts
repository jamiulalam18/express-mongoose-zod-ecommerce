import { EProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (payload: EProduct) => {
  const result = await Product.create(payload);
  return result;
};
const getAllProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

const getProductByIDFromDB = async (id: string) => {
  const result = await Product.findOne({ _id: id });
  return result;
};

const updateProductByIDFromDB = async (id: string, productData: EProduct) => {
  const result = await Product.findOneAndUpdate({ _id: id }, productData, {
    new: true,
  });
  return result;
};

const deleteProductByIDFromDB = async (id: string) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

const searchProductFromDB = async (searchTerm: string) => {
  const result = await Product.find({
    $or: [
      { name: { $regex: searchTerm, $options: "i" } },
      { description: { $regex: searchTerm, $options: "i" } },
    ],
  });
  return result;
};

export const ProductServices = {
  createProduct,
  getAllProductsFromDB,
  getProductByIDFromDB,
  updateProductByIDFromDB,
  deleteProductByIDFromDB,
  searchProductFromDB
};
