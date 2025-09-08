import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'User'
  },
  title: {
    type: String,
    required: [true, 'Please add a job title.'],
    trim: true,
    maxlength: [100, 'Job title cannot be more than 100 characters.'],
  },
  description: {
    type: String,
    required: [true, 'Please add a job description.'],
  },
  location: {
    type: String,
    required: [true, 'Please add a job location.'],
  },
  salary: {
    type: String,
    required: false, 
  },
  requirements: {
    type: [String],
    required: false,
  },
  company_logo_url: {
    type: String,
    required: true
  },
  company_name: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Internship'],
    default: 'Full-time',
  },
  status: {
    type: String,
    enum: ['Open', 'Closed'],
    default: 'Open',
  },
  jobApplicants:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:false
  }]
}, {
  timestamps: true,
});

const Job = mongoose.model('Job', jobSchema);

export default Job;