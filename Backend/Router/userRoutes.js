import express from 'express';
import { UserController } from '../Controller/UserController.js';
import { authMiddleware,adminMiddleware } from '../middleware/middleware.js';


const router = express.Router();
const userController = new UserController();

router.post('/', userController.createUser);
router.get('/:id',  userController.getUser);
router.put('/:id',  userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);
router.post("/login",userController.LogIn)


export default router;