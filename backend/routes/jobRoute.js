import express from "express"
import { protectRoute } from "../middleware/authMiddleware.js"
import checkRecruiter from "../middleware/checkRecruiter.js"
import { getAllJobs, addJobs, getJobById, deleteJob, updateJob, getApplicants, updaterecruiterprofile, isRecruiterverifiedroute, getJobspostedByrecruiter, getallApplicants, AcceptJob } from "../controllers/jobController.js"
import { isRecruiterverified } from "../middleware/recruiterprofile.js"
const router = express.Router()

router.get('/get/alljobs', getAllJobs)

router.use(protectRoute)


router.get('/get/jobdetails/:id', getJobById)



//admin specific operations
router.get('/get/isrecruiterverified', checkRecruiter, isRecruiterverifiedroute)

router.post('/update/recruiterprofile', checkRecruiter, updaterecruiterprofile)

router.get('/get/jobspostedbyrecruiter', checkRecruiter, isRecruiterverified, getJobspostedByrecruiter)

router.get('/get/job/:id', checkRecruiter, isRecruiterverified, getJobById)

router.post('/createjob', checkRecruiter, isRecruiterverified, addJobs)

router.put('/update/job/:id', checkRecruiter, isRecruiterverified, updateJob)

router.delete('/delete/job/:id', checkRecruiter, isRecruiterverified, deleteJob)

router.get('/get/allapplicants', checkRecruiter, isRecruiterverified, getallApplicants)

router.get('/:id/applicants', checkRecruiter, getApplicants)

router.post('/accept/applicant/job/', checkRecruiter, isRecruiterverified, AcceptJob)

export default router
