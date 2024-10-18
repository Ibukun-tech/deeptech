import { UserRepository } from '../repository/UserRepository.js';
import { badRequestException, notFoundException } from '../helper/exception.js';
import { hashPayload } from '../utils/index.js';
import dotenv from "dotenv"
dotenv.config()
export class UserService {
  constructor() {
    this._userRepository = new UserRepository();
  }

  async createUser(userData) {
    const { username, email, password, role } = userData;
    const existingUser = await this._userRepository.findByEmail(email);
    if (existingUser) {
      throw new badRequestException('Email already associated with another user');
    }
    const hashedPassword = await hashPayload(password);
    return this._userRepository.createUser(username, email, hashedPassword, role);
  }

  async getUserById(userId) {
    const user = await this._userRepository.findById(userId);
    if (!user) {
      throw new notFoundException('User not found');
    }
    return user;
  }

  async updateUser(userId, userData) {
    const user = await this._userRepository.findById(userId);
    if (!user) {
      throw new notFoundException('User not found');
    }
    if (userData.password) {
      userData.password = await hashPayload(userData.password);
    }
    return this._userRepository.updateUser(userId, userData);
  }

  async deleteUser(userId) {
    const user = await this._userRepository.findById(userId);
    if (!user) {
      throw new notFoundException('User not found');
    }
    return this._userRepository.deleteUser(userId);
  }
}