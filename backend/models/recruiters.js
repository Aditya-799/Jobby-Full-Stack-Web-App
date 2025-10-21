import mongoose from 'mongoose';

const RecruiterSchema = new mongoose.Schema({
    // 1. IDENTITY & AUTHENTICATION
    email: {
        type: String,
        required: true,
        unique: true, // Ensures no two recruiters share the same login email
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false // Prevents the hashed password from being returned by default queries
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    profilePic:{
        type: String,
        required: true
    },

    // 2. ORGANIZATIONAL AFFILIATION
    // This links the recruiter to a separate Company document
    companyName: {
        type: String,
        default:"",
        required: false,
        trim: true
    },
    jobTitle: {
        type: String,
        default: "",
        required: false,
        trim: true
    },
    companyLocation: {
        type: String,
        default:"",
        required: false, // Optional but useful
        trim: true
    },
    companyWebsiteUrl:{
        type: String,
        default: "",
        required: false, // Optional but useful
        trim: true
    },

    // 3. PLATFORM ROLE & STATUS
    role: {
        type: String,
        enum: ['recruiter', 'admin'], // Explicitly define roles for access control
        default: 'recruiter',
        required: false
    },
    status: {
        type: String,
        enum: ['Active', 'Suspended', 'Pending'],
        default: 'Active',
        required:false
    },
    isProfileComplete: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true // Adds 'createdAt' and 'updatedAt' fields automatically
});

// Important: Before saving, you would typically use middleware (e.g., pre('save'))
// to hash the password before saving it to the database.

const Recruiter = mongoose.model('Recruiter', RecruiterSchema);
export default Recruiter;