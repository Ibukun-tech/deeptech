import { ProductRepository } from '../repository/ProductRepository.js';
import { notFoundException } from '../helper/exception.js';
import dotenv from "dotenv"
dotenv.config()
export class ProductService {
  constructor() {
    this._productRepository = new ProductRepository();
  }

  async createProduct(productData) {
    return await  this._productRepository.createProduct(productData);
  }
async getAllProduct(){
    return await this._productRepository.find()
}
  async getProductById(productId) {
    const product = await this._productRepository.findById(productId);
    if (!product) {
      throw new notFoundException('Product not found');
    }
    return product;
  }

  async updateProduct(productId, productData) {
    const product = await this._productRepository.findById(productId);
    if (!product) {
      throw new notFoundException('Product not found');
    }
    return  this._productRepository.updateProduct(productId, productData);
  }

  async deleteProduct(productId) {
    const product = await this._productRepository.findById(productId);
    if (!product) {
      throw new notFoundException('Product not found');
    }
    return this._productRepository.deleteProduct(productId);
  }
}