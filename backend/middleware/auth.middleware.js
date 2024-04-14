import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../model/user.model.js';

export const AuthMiddleware = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a token',
            });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) {
            return res.status(400).json({
                success: false,
                message: 'User not Authorized',
            });
        }

        const userId = new mongoose.Types.ObjectId(decodedToken.token);
        const user = await User.findById(userId);
        // password is not sent to the client
        user.password = undefined;

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found',
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}