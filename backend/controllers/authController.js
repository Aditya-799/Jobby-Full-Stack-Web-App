import User from "../models/Users.js"
import Recruiter from "../models/recruiters.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export async function signup(req, res) {
    const { fullName, email, password, role} = req.body;
    console.log(fullName,email,password,role)
    try{
     if(!fullName || !email || !password || !role){
        return res.status(400).json({message:"All fields are required"})
     }
     if(password.length < 6){
        return res.status(400).json({message:"Password must be at least 6 characters long"})
     }
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const index=Math.floor(Math.random()*100)+1
    const randomAvatar=`https://avatar.iran.liara.run/public/${index}.png`
    const hashedpassword=await bcrypt.hash(password,10)
    if(role==='recruiter'){
      const existingRecruiter=await Recruiter.findOne({email})
      if(existingRecruiter){
        return res.status(400).json({message:"Recruiter already exists try with a different email"})
      }
      else{
        const newRecruiter=await Recruiter.create({
          fullName,
          email,
          password:hashedpassword,
          role,
          profilePic:randomAvatar,
        })
        const token=jwt.sign({recruiterId:newRecruiter._id,role:'recruiter'},process.env.JWT_SECRET,{expiresIn:'7d'})
        res.cookie("jwt",token,{
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite:"strict",
          secure: process.env.NODE_ENV === 'production'
        })
        res.status(200).json({success:true,newRecruiter,token});
      }
    }
    else{
    const existingUser=await User.findOne({email})
    if(existingUser){
      return res.status(400).json({message:"User already exists try with a different email"})
    }
    
  
    
  
    const newUser=await User.create({
      fullName,
      email,
      password:hashedpassword,
      role,
      profilePic:randomAvatar,
    })
  
    const token=jwt.sign({userId:newUser._id,role:'user'},process.env.JWT_SECRET,{expiresIn:'7d'})
  
    res.cookie("jwt",token,{
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite:"strict",
      secure: process.env.NODE_ENV === 'production'
    })
    res.status(200).json({success:true,user:newUser,token});
  }
  }
    catch(error){
      console.error("Error during signup:", error);
      res.status(500).json({ message: error.message });
    }
  }
  
  export async function login(req, res) {
    try{
      const {email,password,role}=req.body
      if(!email || !password || !role){
        return res.status(400).json({message:"All fields are required"})
      }
      if(role==="recruiter"){
        const recruiter=await Recruiter.findOne({email})
        if(!recruiter){
          return res.status(400).json({message:"Recruiter does not exist"})
        }
        const ispasswordValid=await bcrypt.compare(password,recruiter.password)
        if(!ispasswordValid){
          return res.status(401).json({message:"Invalid Email or Password"})
        }
        const token=jwt.sign({recruiterId:recruiter._id,role:'recruiter'},process.env.JWT_SECRET,{expiresIn:'7d'})
  
        res.cookie("jwt",token,{
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite:"strict",
          secure: process.env.NODE_ENV === 'production'
        })
        res.status(201).json({success:true,recruiter,token});
      }
      else{
      const user=await User.findOne({email})
      if(!user){
        return res.status(400).json({message:"User does not exist"})
      }
      const ispasswordValid=await bcrypt.compare(password,user.password)
      if(!ispasswordValid){
        return res.status(401).json({message:"Invalid Email or Password"})
      }
      const isRolevalid=user.role===role
      if(!isRolevalid){
        return res.status(401).json({message:"Invalid role selected"})
      }
      const token=jwt.sign({userId:user._id,role:'user'},process.env.JWT_SECRET,{expiresIn:'7d'})
  
    res.cookie("jwt",token,{
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite:"strict",
      secure: process.env.NODE_ENV === 'production'
    })
    res.status(201).json({success:true,user,token});
    }
  }
    catch(error){
      console.error("Error during login:", error);
      res.status(500).json({ message: error.message });
    }
  }

  /// Add recruiter Logout
  
  export async function logout(req, res) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === 'production'
    });
    res.status(200).json({success:true,message:"Logged out successfully"});
  }

export async function getCurrentUser(req, res) {
  try {
    // Access the JWT token from cookies
    const token = req.cookies.jwt;
    
    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ success: true, user,token });
  } catch (error) {
    console.error("Error getting current user:", error);
    res.status(401).json({ message: "Invalid token" });
  }
}
