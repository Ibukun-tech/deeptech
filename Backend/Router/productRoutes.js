import express from 'express';
import { ProductController } from '../Controller/ProductController.js';
import { authMiddleware,adminMiddleware } from '../middleware/middleware.js';
const router = express.Router();
const productController = new ProductController();

router.post('/',  authMiddleware, adminMiddleware, productController.createProduct);
router.get('/:id', productController.getProduct);
router.put('/:id', authMiddleware, adminMiddleware, productController.updateProduct);
router.delete('/:id', authMiddleware, adminMiddleware, productController.deleteProduct);

export default router;