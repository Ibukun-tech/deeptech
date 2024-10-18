import { ProductService } from '../service/ProductService.js';
import { ErrorHandler } from '../helper/error-handler.js';

const productService = new ProductService();
const errorHandler = new ErrorHandler();

export class ProductController {
  async createProduct(req, res) {
    try {
      const product = await productService.createProduct(req.body);
      res.status(201).json({ success: true, data: product });
    } catch (error) {
      errorHandler.handleCustomError(error, res);
    }
  }
  async getAllProduct(req, res){
    try {
      const product = await productService.getAllProduct();
      res.status(200).json({ success: true, data: product });
    } catch (error) {
      errorHandler.handleCustomError(error, res);
    }
 
  }

  async getProduct(req, res) {
    try {
      const product = await productService.getProductById(req.params.id);
      res.status(200).json({ success: true, data: product });
    } catch (error) {
      errorHandler.handleCustomError(error, res);
    }
  }

  async updateProduct(req, res) {
    try {
      const product = await productService.updateProduct(req.params.id, req.body);
      res.status(200).json({ success: true, data: product });
    } catch (error) {
      errorHandler.handleCustomError(error, res);
    }
  }

  async deleteProduct(req, res) {
    try {
      await productService.deleteProduct(req.params.id);
      res.status(204).json({ success: true });
    } catch (error) {
      errorHandler.handleCustomError(error, res);
    }
  }
}