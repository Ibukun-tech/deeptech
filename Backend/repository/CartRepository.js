import CartModel from "../model/cartModel.js";
import { logger } from "../helper/logger.js";
import dotenv from "dotenv"
dotenv.config()
export class CartRepository {
  async createOrUpdateCart(userId, items) {
    try {
      const cart = await CartModel.findOneAndUpdate(
        { user: userId },
        { user: userId, items: items },
        { upsert: true, new: true }
      );
      return cart;
    } catch (err) {
      logger.error("Error creating or updating cart:", err);
      throw err;
    }
  }

  async getCartByUserId(userId) {
    try {
      return await CartModel.findOne({ user: userId }).populate('items.product');
    } catch (err) {
      logger.error("Error finding cart:", err);
      throw err;
    }
  }

  async clearCart(userId) {
    try {
      return await CartModel.findOneAndUpdate(
        { user: userId },
        { $set: { items: [] } },
        { new: true }
      );
    } catch (err) {
      logger.error("Error clearing cart:", err);
      throw err;
    }
  }

  async deleteCart(userId) {
    try {
      return await CartModel.findOneAndDelete({ user: userId });
    } catch (err) {
      logger.error("Error deleting cart:", err);
      throw err;
    }
  }
}