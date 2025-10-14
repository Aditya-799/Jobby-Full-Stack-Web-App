import Job from "../models/Job.js"
import User from "../models/Users.js"


export const getAllJobs = async (req, res) => {
    try {
      const { search_q='', minimum_package=0,employementType} = req.query;
      let query = {};
  
      if (search_q) {
        query.title = { $regex: search_q, $options: 'i' };
      }
  
      if (minimum_package) {
        const minPackage = Number(minimum_package)/100000;
        if (!isNaN(minPackage)) {
          query.salary = { $gte: (minPackage) };
        }
      }
      if (employementType && employementType.length > 0) {
        // Split comma-separated string if needed
        const types = Array.isArray(employementType) 
          ? employementType 
          : employementType.split(',').map(s => s.trim()).filter(Boolean)
        
        if (types.length > 0) {
          query.jobType = { $in: types }
        }
      }
  
      const jobs = await Job.find(query);
  
      res.status(200).json(jobs);
      
    } catch (error) {
      console.error('Error fetching jobs:', error);
      res.status(500).json({ message: 'An unexpected error occurred.' });
    }
  };


export const addJobs=async(req,res)=>{
    try {
        const {title,description,location,salary,requirements,jobType,status}=req.body
        if(!title || !description || !location || !salary || !requirements || !jobType || !status){
            return res.status(400).json({message:"All fields are required"})
        }
        const jobs=await Job.find({title:title})
        const ispostedbysameuser=jobs.find(job=>job.user.toString()===req.user._id.toString())
        if(ispostedbysameuser){
            return res.status(400).json({message:"You have already posted a job with this title"})
        }
        const job=await Job.create({
            user:req.user._id,
            title,
            description,
            location,
            salary,
            requirements,
            jobType,status})
        res.status(201).json(job)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const getJobById=async(req,res)=>{
    try {
        const jobId=req.params.id
        console.log(jobId)
        const job=await Job.findById(jobId)
        res.status(200).json(job)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const deleteJob=async (req,res)=>{
    try{
        const jobId=req.params.id
        await Job.findByIdAndDelete(jobId)
        res.status(200).json({message:"Job deleted successfully"})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

export const updateJob=async(req,res)=>{
    try{
        const jobId=req.params.id
        const job=await Job.findById(jobId)
        if(!job){
            return res.status(404).json({message:"Job not found"})
        }
        if(job.user.toString()!==req.user._id.toString()){
            return res.status(403).json({message:"You are not authorized to update this job"})
        }
        const updatedJob=await Job.findByIdAndUpdate(jobId,req.body,{new:true})
        res.status(200).json(updatedJob)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

export const getApplicants=async(req,res)=>{
    try{
        const jobId=req.params.id
        const job=await Job.findById(jobId)
        if(!job){
            return res.status(404).json({message:"Job not found"})
        }
        const response=await Job.findById(jobId)
        const userIds=response.jobApplicants
        const applicants=await User.find({_id:{$in:userIds}})
        res.status(200).json(applicants)
    }
    catch(error){
        console.log("Internal server error")
        res.status(500).json({message:error.message})
    }
}