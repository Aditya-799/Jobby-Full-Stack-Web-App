import Job from "../models/Job.js"
import User from "../models/Users.js"
import Recruiter from '../models/recruiters.js'

//Doubt mongo query
export const getAllJobs = async (req, res) => {
    try {
        const { search_q = '', minimum_package = 0, employementType } = req.query;
        let query = {};

        if (search_q) {
            query.title = { $regex: search_q, $options: 'i' };
        }

        if (minimum_package) {
            const minPackage = Number(minimum_package) / 100000;
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
export const addJobs = async (req, res) => {
    try {
        const recruiterId = req.recruiter._id
        const recruiterdetails = await Recruiter.findById(recruiterId)
        if (!recruiterdetails) {
            return res.status(404).json({ message: "Recruiter not found" })
        }
        const { title, job_description, location, salary, requirements, jobType, status } = req.body
        if (!title || !job_description || !location || !salary || !requirements || !jobType || !status) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const words = job_description.split(',')
        let description = words.slice(0, 21).join(',')

        //To check whether the two jobs are posted with same title

        const jobs = await Job.find({ title: title })
        const ispostedbysameuser = jobs.find(job => job.recruiterId.toString() === req.recruiter._id.toString())
        if (ispostedbysameuser) {
            return res.status(400).json({ message: "You have already posted a job with this title" })
        }
        const [company_name, company_logo_url] = [recruiterdetails.companyName, recruiterdetails.companyLogoUrl]

        const job = await Job.create({
            recruiterId: recruiterId,
            title,
            description,
            job_description,
            location,
            salary,
            requirements,
            company_name,
            company_logo_url,
            jobType, status
        })


        const recruiter = await Recruiter.findById(recruiterId)
        if (recruiter) {
            console.log('pushing the data into the jobs posted by recruiter')
            recruiter.Jobsposted.push(job._id)
            await recruiter.save()
        }
        console.log('Job created successfully', job)
        res.status(201).json(job)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id
        const job = await Job.findById(jobId)
        res.status(200).json(job)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id
        const recruiterId = req.recruiter._id
        const recruiter = await Recruiter.findById(recruiterId)
        if (!recruiter) {
            return res.status(404).json({ message: "Recruiter not found" })
        }
        if (recruiter.Jobsposted.indexOf(jobId) === -1) {
            return res.status(403).json({ message: "You are not authorized to delete this job" })
        }
        const AcceptedJobsandCandidates = recruiter.Acceptedcandidates.filter(each => each.jobId.toString() !== jobId)
        if (AcceptedJobsandCandidates.length > 0) {
            return res.status(400).json({ message: "Cannot delete job with accepted candidates" })
        }
        recruiter.Acceptedcandidates = AcceptedJobsandCandidates
        await recruiter.save()
        await Job.findByIdAndDelete(jobId)
        await Recruiter.findByIdAndUpdate(recruiterId, { $pull: { Jobsposted: jobId } })
        res.status(200).json({ message: "Job deleted successfully" })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateJob = async (req, res) => {
    try {
        const newjob = req.body
        console.log(newjob)
        const jobId = newjob.jobId
        console.log(jobId)
        const job = await Job.findById(jobId)
        if (!job) {
            return res.status(404).json({ message: "Job not found" })
        }
        else {
            const updatedJob = await Job.findByIdAndUpdate(jobId, newjob, { new: true })
            if (!updatedJob) {
                return res.status(404).json({ message: "Job not found" })
            }
            else {
                res.status(200).json(updatedJob)
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id
        const job = await Job.findById(jobId)
        if (!job) {
            return res.status(404).json({ message: "Job not found" })
        }
        const response = await Job.findById(jobId)
        const userIds = response.jobApplicants
        const applicants = await User.find({ _id: { $in: userIds } })
        res.status(200).json(applicants)
    }
    catch (error) {
        console.log("Internal server error")
        res.status(500).json({ message: error.message })
    }
}

export const getJobspostedByrecruiter = async (req, res) => {
    try {
        const recruiter = await Recruiter.findById(req.recruiter._id)
        const jobsArray = recruiter.Jobsposted
        const jobs = await Job.find({ _id: { $in: jobsArray } })
        const newarray = []
        for (let each of jobs) {

            newarray.push({ id: each._id, jobtitle: each.title, jobtype: each.jobType, date: each.createdAt, status: each.status, applicantnumber: each.jobApplicants.length })
        }
        res.status(200).json(newarray)
    }
    catch (error) {
        console.log('Error fetching the jobs posted by recruiter')
        res.status(500).json({ message: error.message })
    }
}

export const getallApplicants = async (req, res) => {
    try {
        const recruiterId = req.recruiter._id
        const recruiter = await Recruiter.findById(recruiterId)
        const jobsArray = recruiter.Jobsposted
        const jobs = await Job.find({ _id: { $in: jobsArray } })
        let finaljobs = []
        for (let each of jobs) {
            const userIds = each.jobApplicants
            const applicants = await User.find({ _id: { $in: userIds } })
            if (applicants.length == 0) continue
            for (let applicant of applicants) {
                finaljobs.push({ id: each._id, userId: applicant._id, name: applicant.fullName, email: applicant.email, phone: applicant.phone, jobtitle: each.title, jobtype: each.jobType, resumeUrl: applicant.resumeUrl })
            }
        }
        return res.status(200).json(finaljobs)

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export const updaterecruiterprofile = async (req, res) => {
    try {
        const recruiterId = req.recruiter._id
        const recruiter = await Recruiter.findById(recruiterId)
        if (!recruiter) {
            return res.status(404).json({ message: "Recruiter not found" })
        }
        if (recruiter.isProfileComplete === true) {
            return res.status(400).json({ message: "Recruiter profile already completed" })
        }
        const updatedRecruiter = await Recruiter.findByIdAndUpdate(recruiterId, { ...req.body, isProfileComplete: true }, { new: true })
        if (!updatedRecruiter) {
            return res.status(404).json({ message: "Recruiter not found" })
        }
        else {
            res.status(200).json(updatedRecruiter)
        }
    }
    catch (error) {
        console.error(error.message)
        console.log(error)
    }
}

export const isRecruiterverifiedroute = async (req, res) => {
    try {
        const recruiterId = req.recruiter._id
        const recruiter = await Recruiter.findById(recruiterId)
        if (!recruiter) {
            return res.status(404).json({ message: "Recruiter not found" })
        }
        if (recruiter.isProfileComplete === true) {
            return res.status(200).json({ message: "Recruiter profile completed", iscompleted: true })
        }
        else {
            return res.status(200).json({ message: "Recruiter profile not completed", iscompleted: false })
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const AcceptJob = async (req, res) => {
    try {
        const recruiterId = req.recruiter._id;
        const { jobId, userId, action } = req.body

        const [recruiter, job, user] = await Promise.all([
            Recruiter.findById(recruiterId),
            Job.findById(jobId),
            User.findById(userId),
        ]);

        if (!recruiter) return res.status(404).json({ message: "Recruiter not found" });
        if (!job) return res.status(404).json({ message: "Job not found" });
        if (!user) return res.status(404).json({ message: "User not found" });
        if (recruiter.Jobsposted.indexOf(jobId) === -1) {
            return res.status(403).json({ message: "You are not authorized to accept applicants for this job" });
        }

        if (user.AcceptedJobs.includes(jobId)) {
            return res.status(400).json({ message: "User already accepted for this job" });
        }

        if (user.RejectedJobs.includes(jobId)) {
            return res.status(400).json({ message: "User already rejected for this job" });
        }

        // Update user
        if (action === 'accept') {


            //Update recruiter
            const alreadyAccepted = await Recruiter.findOne({
                _id: recruiterId,
                "Acceptedcandidates.jobId": jobId,
                "Acceptedcandidates.candidateId": userId,
            });

            if (alreadyAccepted) {
                return res.status(400).json({ message: "Already accepted this user for this job" });
            }

            await Recruiter.updateOne(
                { _id: recruiterId },
                { $push: { Acceptedcandidates: { jobId, candidateId: userId } } }
            );

            user.AcceptedJobs.push(jobId);
            await user.save();

            user.Appliedjobs.pull(jobId);
            await user.save();

            // Update job
            job.jobApplicants.pull(userId);
            await job.save();

            return res.status(201).json({ message: "User job accepted successfully" });
        }
        else if (action === 'reject') {
            user.RejectedJobs.push(jobId);
            await user.save();

            user.Appliedjobs.pull(jobId);
            await user.save();

            // Update job
            job.jobApplicants.pull(userId);
            await job.save();
        }
        else {
            res.status(400).json({ message: "Invalid action" })
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
