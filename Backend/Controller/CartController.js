import { CartService } from '../service/CartService.js';
import { ErrorHandler } from '../helper/error-handler.js';

const cartService = new CartService();
const errorHandler = new ErrorHandler();

export class CartController {
  async updateCart(req, res) {
    try {
      const { userId, items } = req.body;
      const cart = await cartService.updateCart(userId, items);
      res.status(200).json({ success: true, data: cart });
    } catch (error) {
      errorHandler.handleCustomError(error, res);
    }
  }

  async getCart(req, res) {
    try {
      const { userId } = req.params;
      const cart = await cartService.getCart(userId);
      res.status(200).json({ success: true, data: cart });
    } catch (error) {
      errorHandler.handleCustomError(error, res);
    }
  }

  async clearCart(req, res) {
    try {
      const { userId } = req.params;
      const cart = await cartService.clearCart(userId);
      res.status(200).json({ success: true, data: cart });
    } catch (error) {
      errorHandler.handleCustomError(error, res);
    }
  }

  async deleteCart(req, res) {
    try {
      const { userId } = req.params;
      await cartService.deleteCart(userId);
      res.status(204).json({ success: true });
    } catch (error) {
      errorHandler.handleCustomError(error, res);
    }
  }
}
