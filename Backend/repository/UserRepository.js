import UserModel from "../model/userModel.js"
import { badRequestException } from "../helper/exception.js"
import {logger} from "../helper/logger.js"
import dotenv from "dotenv"
dotenv.config()
export class UserRepository {
   async findByEmail(email){
    try{
      return await UserModel.findOne({email})
    }catch(err){
        logger.error("Error looking up user by email:", err)
        throw err
    }
   }
    async createUser(
    username, email, password, role
  ) {
    try {
      const user = await User.create({
       username, email, password,role
      });

      if (!user) throw new badRequestException("User could not be created");

      return user;
    } catch (err) {
      logger.error("Error creating user:", err);
      throw err;
    }
  }
    async findById(id) {
        try {
        return await UserModel.findById(id);
        } catch (err) {
        logger.error("Error looking up user by ID:", err);
        throw err;
      }
    }

    async updateUser(id, userData) {
        try {
            return await UserModel.findByIdAndUpdate(id, userData, { new: true });
        } catch (err) {
            logger.error("Error updating user:", err);
            throw err;
        }
     }

    async deleteUser(id) {
    try {
        return await UserModel.findByIdAndDelete(id);
    } catch (err) {
        logger.error("Error deleting user:", err);
        throw err;
    }
    }
}