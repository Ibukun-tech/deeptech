import {UserRepository} from "../repository/UserRepository.js"
import {badRequestException, unauthorizedException} from "../helper/exception.js"
import { hashPayload, comparePasswords } from "../utils/index.js"
import { logger } from "../helper/logger.js"
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
dotenv.config()
const UserModel = new UserRepository()

export class AuthService {
    constructor() {
        this._userRepository = UserModel
    }

    async Register(payload) {
        try{
        const { email,userName, password,role  } =payload
        const User = await this._userRepository.findByEmail(email)
        if (User) {
                throw new badRequestException(
                "Email already associated with another user. Kindly specify a different email",
            );
          }
        const hashedPassword=await hashPayload(password)
        await this._userRepository.createUser(
         userName,email, hashedPassword,role
      );
    }catch(err){
        logger.error(err)
        throw err
    }
    }

    async Login(payload) {
        try {
            const { email, password } = payload
            const user = await this._userRepository.findByEmail(email)

            if (!user) {
                throw new unauthorizedException("Invalid email or password")
            }

            const isPasswordValid = await comparePasswords(password, user.password)

            if (!isPasswordValid) {
                throw new unauthorizedException("Invalid email or password")
            }

            const token = jwt.sign(
                { userId: user._id, email: user.email, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            )
        return AppResponse(
            { token, user: { id: user._id, email: user.email, role: user.role }},
             "Authorization successful",
            true,
        );

        } catch (err) {
            logger.error(err)
            throw err
        }
    }
}
