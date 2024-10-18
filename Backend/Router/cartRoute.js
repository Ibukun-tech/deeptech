import express from 'express';
import { CartController } from '../Controller/CartController.js';
import { authMiddleware } from '../middleware/middleware.js';

const router = express.Router();
const cartController = new CartController();

router.post('/add', authMiddleware, cartController.updateCart);
router.get('/:userId', authMiddleware, cartController.getCart);
router.put('/update', cartController.updateCart);
router.delete("/:userId/", authMiddleware, cartController.deleteCart);

export default router;