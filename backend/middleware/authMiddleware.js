import jwt from 'jsonwebtoken';
import User from '../models/Users.js';
import dotenv from 'dotenv';
import Recruiter from '../models/recruiters.js';
dotenv.config();

export const protectRoute = async (req, res, next) => {
    try{
        // Get token from cookies OR Authorization header
        let token = req.cookies.jwt;
        // If no cookie, check Authorization header
        console.log(req.headers.authorization)
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

        if(decoded.recruiterId){

        const recruiter=await Recruiter.findById(decoded.recruiterId).select('-password')
        if(!recruiter){
            return res.status(404).json({message:"Recruiter not found"})
        }
        else{
            console.log(recruiter)
            req.recruiter=recruiter
        }
        next()
    }
    else{

        const user = await User.findById(decoded.userId).select("-password")
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        else{
             req.user = user
        }
        
       
        next()
    }
    }
    catch(error){
        console.error("Error in protectRoute middleware:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}