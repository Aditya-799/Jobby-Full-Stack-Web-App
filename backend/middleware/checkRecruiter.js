import User from "../models/Users.js"

const checkRecruiter=async(req,res,next)=>{
    try{
        const user=await User.findById(req.user._id)
        if(user.role!=='recruiter'){
            return res.status(403).json({message:'You are not authorized to access this resource'})
        }
        next()
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

export default checkRecruiter