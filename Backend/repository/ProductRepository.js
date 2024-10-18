import ProductModel from "../model/ProductModel.js";
import { logger } from "../helper/logger.js";
import dotenv from "dotenv"
dotenv.config()
export class ProductRepository {
  async createProduct(productData) {
    try {
      const product = await ProductModel.create(productData);
      return product;
    } catch (err) {
      logger.error("Error creating product:", err);
      throw err;
    }
  }

  async find() {
    try {
      return await ProductModel.find()
    } catch (err) {
      logger.error("Error looking for product: ", err);
      throw err;
    }
  }

  async findById(id) {
    try {
      return await ProductModel.findById(id);
    } catch (err) {
      logger.error("Error looking up product by ID:", err);
      throw err;
    }
  }

  async updateProduct(id, productData) {
    try {
      return await ProductModel.findByIdAndUpdate(id, productData, { new: true });
    } catch (err) {
      logger.error("Error updating product:", err);
      throw err;
    }
  }

  async deleteProduct(id) {
    try {
      return await ProductModel.findByIdAndDelete(id);
    } catch (err) {
      logger.error("Error deleting product:", err);
      throw err;
    }
  }
}