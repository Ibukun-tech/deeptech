import { CartRepository } from '../repository/CartRepository.js';
import { notFoundException } from '../helper/exception.js';
import dotenv from "dotenv"
dotenv.config()
export class CartService {
  constructor() {
    this._cartRepository = new CartRepository();
  }

  async updateCart(userId, items) {
    return this._cartRepository.createOrUpdateCart(userId, items);
  }

  async getCart(userId) {
    const cart = await this._cartRepository.getCartByUserId(userId);
    if (!cart) {
      throw new notFoundException('Cart not found');
    }
    return cart;
  }

  async clearCart(userId) {
    return this._cartRepository.clearCart(userId);
  }

  async deleteCart(userId) {
    return this._cartRepository.deleteCart(userId);
  }
}
