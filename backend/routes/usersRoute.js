import express from "express"
import  {protectRoute}  from "../middleware/authMiddleware.js"
import  {getUserProfile,updateProfile,applyJob}  from "../controllers/usersController.js"

const router=express.Router()

router.use(protectRoute)

router.get('/get/profile',getUserProfile)

router.put('/update/profile',updateProfile)

router.post('/apply-job/:id',applyJob)

//router.post('/upload-resume',uploadResume)


//router.get('/resume',getResume)

//router.get('/appliedjobs',getAppliedJobs)

//router.get('/savedjobs',getSavedJobs) 

//router.get('/appliedjobs/:id',getAppliedJobs)


export default router