import User from "../models/Users.js"
import Job from "../models/Job.js"

export const getUserProfile = async (req, res) => {
    try {
        // req.user contains the authenticated user's information
        const currentUser = req.user;
        
        res.json({
            success: true,
            user: currentUser
        });
    } catch (error) {
        console.log('trigger')
        res.status(500).json({ message: error.message });
    }
};


//Not done yet

export const updateProfile=async (req,res)=>{
    try{
        const {fullName,email,bio,skills,phone}=req.body
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
    const jobId = req.params.id;
    const userId = req.user._id;
    const user = await User.findById(userId);     
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    const job = await Job.findById(jobId);
    if(!job){
        return res.status(404).json({message:"Job not found"});
    }
    if(user.Appliedjobs.includes(jobId)){
        return res.status(400).json({message:"You have already applied for this job"});
    }
    job.jobApplicants.push(userId);                
    user.Appliedjobs.push(jobId);
    await job.save();
    await user.save();
    res.status(200).json({ message: "Job applied successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export const getAppliedJobs=async(req,res)=>{
    try{
        const userId=req.user._id
        const userdetails=await User.findById(userId)
        const jobId=userdetails.Appliedjobs
        const jobs=await Job.find({_id:{$in:jobId}})
        const sendingdata=[]
        for(let each of jobs){
            sendingdata.push({id:each._id,jobtitle:each.title,jobtype:each.jobType,rating:each.rating,status:each.status,rating:each.rating,company_name:each.company_name,location:each.location,salary:each.salary,company_logo_url:each.company_logo_url})
        }
        if(sendingdata.length===0){
            return res.status(400).json({message:"You have not applied for any job"})
        }
        res.status(200).json(sendingdata)
    }
    catch(error){
        console.log(error)
    }
}