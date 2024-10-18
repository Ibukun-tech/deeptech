import jwt from 'jsonwebtoken'
import { unauthorizedException,forbiddenException } from '../helper/exception.js'


export const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    throw new forbiddenException('Access denied. Admin rights required.');
  }
};


export const authMiddleware = async (req, res, next) => {
    console.log(req)
    const authHeader = req.headers.authorization

    if (!authHeader) {
        throw new unauthorizedException('No token provided')
    }

    const [bearer, token] = authHeader.split(' ')

    if (bearer !== 'Bearer' || !token) {
        throw new unauthorizedException('Invalid token format')
    }

    try {
        const decoded =await jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        throw new unauthorizedException('Invalid token')
    }
}