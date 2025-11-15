import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['recruiter', 'user'] },
    bio: { type: String, required: false },
    skills: { type: [String], required: false },
    profilePic: { type: String, required: true },
    phone: { type: String, required: false },
    resume: { type: String, default: null },
    resumePath: { type: String, default: null },
    isProfileComplete: { type: Boolean, default: false },
    phone: { type: String, required: false },
    Appliedjobs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required:false
    }],
    RejectedJobs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required:false
    }],
    AcceptedJobs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required:false
    }]
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

export default User