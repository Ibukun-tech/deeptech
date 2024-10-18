import { UserService } from '../service/UserService.js';
import { ErrorHandler } from '../helper/error-handler.js';
import { AuthService } from '../service/AuthService.js';
const userService = new UserService();
const errorHandler = new ErrorHandler();
const authService= new AuthService()
export class UserController {
    async LogIn(req, res){
    try {
      const {} = await userService.createUser(req.body);
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      errorHandler.handleCustomError(error, res);
    }   
 }
  async createUser(req, res) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      errorHandler.handleCustomError(error, res);
    }
  }

  async getUser(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      errorHandler.handleCustomError(error, res);
    }
  }

  async updateUser(req, res) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      errorHandler.handleCustomError(error, res);
    }
  }

  async deleteUser(req, res) {
    try {
      await userService.deleteUser(req.params.id);
      res.status(204).json({ success: true });
    } catch (error) {
      errorHandler.handleCustomError(error, res);
    }
  }
}