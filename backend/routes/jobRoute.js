import express from "express"
import {protectRoute } from "../middleware/authMiddleware.js"
import checkRecruiter from "../middleware/checkrecruiter.js"
import {getAllJobs,addJobs,getJobById,deleteJob,updateJob,getApplicants,getJobspostedByrecruiter} from "../controllers/jobController.js"

const router=express.Router()

router.get('/get/alljobs',getAllJobs)

router.use(protectRoute)


router.get('/get/jobdetails/:id',getJobById)



//admin specific operations

router.get('/get/jobspostedbyrecruiter',checkRecruiter,getJobspostedByrecruiter)

router.get('/get/job/:id',checkRecruiter,getJobById)

router.post('/createjob',checkRecruiter,addJobs)

router.put('/update/job/:id',checkRecruiter,updateJob)

router.delete('/delete/job/:id',checkRecruiter,deleteJob)

router.get('/:id/applicants',checkRecruiter,getApplicants)

export default router