import User from "../models/Users.js"
import Job from "../models/Job.js"

export const getUserProfile = async (req, res) => {
    try {
        // req.user contains the authenticated user
        const currentUser = req.user;
        
        res.json({
            success: true,
            user: currentUser
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateProfile=async (req,res)=>{
    try{
        const {email,bio,skills}=req.body
        const allowedFields=['email','bio','skills']
        const updateData={}
        for(const field in req.body){
            if(allowedFields.includes(field)){
                updateData[field]=req.body[field]
            }
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { $set: updateData },
            { new: true, runValidators: true }
          );
      
          // 5. Check if the user was found and updated.
          if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          // 6. Return the updated user object (excluding the password).
          res.status(200).json({
            _id: updatedUser._id,
            email: updatedUser.email,
            bio: updatedUser.bio,
            skills: updatedUser.skills,
            profilePic: updatedUser.profilePic
          });

    }
    catch(error){
        console.log('Invalid User')
        res.status(400).json({message:error.message})
    }
}

export const uploadResume=async (req,res)=>{
try {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }


// Get the current user
const user = req.user;

// Update user with resume file path
const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { 
        resume: req.file.filename,
        resumePath: req.file.path
    },
    { new: true }
).select('-password');

res.json({
    success: true,
    message: "Resume uploaded successfully",
    user: updatedUser,
    file: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        path: req.file.path
    }
});
} catch (error) {
console.error("Error uploading resume:", error);
res.status(500).json({ message: "Error uploading resume" });
}
}


export const applyJob=async(req,res)=>{
    try {
        const jobId=req.params.id
        const user=req.user._id
        const creatorId=await Job.findById(jobId).populate("user")
        if(creatorId.user.toString()===user.toString()){
            return res.status(400).json({message:"You cannot apply to your own job"})
        }
        const existingApplication=await Job.findOne({jobApplicants:user})
        if(existingApplication){
            return res.status(400).json({message:"You have already applied to this job"})
        }   
        const job=await Job.findByIdAndUpdate(jobId,{$push:{jobApplicants:user}},{new:true})
        res.status(200).json(job)

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}