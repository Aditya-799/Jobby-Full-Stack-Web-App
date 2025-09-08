import Job from "../models/Job.js"
import User from "../models/Users.js"

export const getAllJobs=async(req,res)=>{
    try {
        const jobs=await Job.find()
        res.status(200).json(jobs)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


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