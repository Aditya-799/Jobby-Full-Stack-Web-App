import Job from "../models/Job.js"
import User from "../models/Users.js"
import Recruiter from '../models/recruiters.js'

//Doubt mongo query
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


//Admin specify operations
export const addJobs=async(req,res)=>{
    try {
        const { title,job_description,location,salary,requirements,jobType,status,company_name}=req.body
        if(!title || !job_description || !location || !salary || !requirements || !jobType || !status || !company_name){
            return res.status(400).json({message:"All fields are required"})
        }
        const words=job_description.split(',')
        let description=words.slice(0,21).join(',')

        //To check whether the two jobs are posted with same title
        
        /*const jobs=await Job.find({title:title})
        const ispostedbysameuser=jobs.find(job=>job.recruiter.toString()===req.recruiter._id.toString())
        if(ispostedbysameuser){
            return res.status(400).json({message:"You have already posted a job with this title"})
        }
        else{
        */
        const job=await Job.create({
            recruiter:req.recruiter._id,
            title,
            description,
            job_description,
            location,
            salary,
            requirements,
            company_name,
            jobType,status})
        
        
        const recruiter=await Recruiter.findById(req.recruiter._id)
        if(recruiter){
            console.log('pushing the data into the jobs posted by recruiter')
            recruiter.Jobsposted.push(job._id)
            await recruiter.save()
        }
        
        res.status(201).json(job)
    
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const getJobById=async(req,res)=>{
    try {
        const jobId=req.params.id
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
        await Recruiter.updateOne({_id:req.recruiter._id},{$pull:{Jobsposted:jobId}})
        res.status(200).json({message:"Job deleted successfully"})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

export const updateJob=async(req,res)=>{
    try{
        const newjob=req.body
        console.log(newjob)
        const jobId=newjob.jobId
        console.log(jobId)
        const job=await Job.findById(jobId)
        if(!job){
            return res.status(404).json({message:"Job not found"})
        }
        else{
        const updatedJob=await Job.findByIdAndUpdate(jobId,newjob,{new:true})
        if(!updatedJob){
            return res.status(404).json({message:"Job not found"})
        }
        else{
            res.status(200).json(updatedJob)
        }
        }
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

export const getJobspostedByrecruiter=async (req,res)=>{
    try{
        const recruiter=await Recruiter.findById(req.recruiter._id)
        const jobsArray=recruiter.Jobsposted
        const jobs=await Job.find({_id:{$in:jobsArray}})
        const newarray=[]
        for(let each of jobs){
        newarray.push({id:each._id,jobtitle:each.title,jobtype:each.jobType,date:each.createdAt,status:each.status,applicantnumber:each.jobApplicants.length})
        }
        res.status(200).json(newarray)
    }
    catch(error){
        console.log('Error fetching the jobs posted by recruiter')
        res.status(500).json({message:error.message})
    }
}

export const getallApplicants=async(req,res)=>{
    try{
        const recruiterId=req.recruiter._id
        const recruiter=await Recruiter.findById(recruiterId)
        const jobsArray=recruiter.Jobsposted
        const jobs=await Job.find({_id:{$in:jobsArray}})
        let finaljobs=[]
        for(let each of jobs){
            const userIds=each.jobApplicants
            const applicants=await User.find({_id:{$in:userIds}})
            if(applicants.length==0) continue
            for(let applicant of applicants){
                finaljobs.push({id:each._id,name:applicant.fullName,email:applicant.email,phone:applicant.phone,jobtitle:each.title,jobtype:each.jobType})
            }
        }
        return res.status(200).json(finaljobs)
        
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}


export const updaterecruiterprofile=async(req,res)=>{
    try{
        const recruiterId=req.recruiter._id
        const recruiter=await Recruiter.findById(recruiterId)
        if(!recruiter){
            return res.status(404).json({message:"Recruiter not found"})
        }
        if(recruiter.isProfileComplete===true){
            return res.status(400).json({message:"Recruiter profile already completed"})
        }
        console.log('j=hi')
        console.log(req.body)
        const updatedRecruiter=await Recruiter.findByIdAndUpdate(recruiterId,req.body,{new:true})
        if(!updatedRecruiter){
            return res.status(404).json({message:"Recruiter not found"})
        }
        else{
            res.status(200).json(updatedRecruiter)
        }
    }
    catch(error){
        console.error(error.message)
        console.log(error)
    }
}