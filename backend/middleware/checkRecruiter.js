import Recruiter from "../models/recruiters.js"

const checkRecruiter = async (req, res, next) => {
    try {
        const recruiter = await Recruiter.findById(req.recruiter?._id)
        if (recruiter?.role !== 'recruiter') {
            return res.status(403).json({ message: 'You are not authorized to access this resource' })
        }
        next()
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export default checkRecruiter