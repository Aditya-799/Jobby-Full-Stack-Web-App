import jwt from 'jsonwebtoken';
import User from '../models/Users.js';
import dotenv from 'dotenv';
dotenv.config();

export const protectRoute = async (req, res, next) => {
    try{
        // Get token from cookies OR Authorization header
        let token = req.cookies.jwt;
        
        // If no cookie, check Authorization header
        if (!token && req.headers.authorization) {
            token = req.headers.authorization.replace('Bearer ', '');
        }
        
        console.log('Token found:', !!token);
        
        if(!token){
            return res.status(401).json({message:"No token provided"})
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({message:"Invalid token"})
        }
        
        const user = await User.findById(decoded.userId).select("-password")
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        
        req.user = user
        next()
    }
    catch(error){
        console.error("Error in protectRoute middleware:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}