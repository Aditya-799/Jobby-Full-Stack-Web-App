import Recruiter from "../models/recruiters.js"

const checkRecruiter=async(req,res,next)=>{
    try{
        const recruiter=await Recruiter.findById(req.recruiter?._id)
        console.log('Check recruiter is triggered')
        if(recruiter?.role!=='recruiter'){
            console.log('from recruiter.jsYou are not authorized to access this resource')
            return res.status(403).json({message:'You are not authorized to access this resource'})
        }
        console.log('successfully completed check recruter.js')
        next()
    }
    catch(error){
        console.log('check recruiter is triggered')
        res.status(500).json({message:error.message})
    }
}

export default checkRecruiter