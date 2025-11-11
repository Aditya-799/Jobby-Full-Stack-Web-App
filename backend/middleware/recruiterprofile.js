import Recruiter from "../models/recruiters.js"



export const isRecruiterverified=async(req,res,next)=>{
    try{
        const recruiterId=req.recruiter._id
        const recruiter=await Recruiter.findById(recruiterId)
        if(!recruiter){
            return res.status(404).json({message:"Recruiter not found"})
        }
        if(recruiter.isProfileComplete ||(recruiter.email !== "" &&
    recruiter.fullName !== "" &&
    recruiter.phone!=="" &&
    recruiter.profilePic !== "" &&
    recruiter.companyName !== "" &&
    recruiter.companyLocation !== "" &&
    recruiter.companyWebsiteUrl !== "" &&
    recruiter.companyCorporateEmail !== "" &&
    recruiter.companyLinkedInUrl !== "" &&
    recruiter.companyContactNumber !== "" &&
    recruiter.companyLogoUrl !== "" &&
    recruiter.companyReview !== "" &&
    recruiter.companyAddress !== "")){
        recruiter.isProfileComplete=true
        await recruiter.save()
        next()
    }
    else{
        res.status(400).json({message:"Recruiter profile not completed"})
    } 
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}