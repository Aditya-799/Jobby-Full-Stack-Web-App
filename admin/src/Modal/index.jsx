import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ToastContainer,toast,Bounce } from "react-toastify";
import {useState,useEffect} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import './index.css';



export default function FormDialog({open,handleClose,dialog,data}) {
 
const [formData,setformData]=useState({
  position:'',
  company_name:'',
  location:'',
  description:'',
  salary:'',
  skills:'',
  jobType:'Full-time',
  status:'Open',
  jobId:''
  
})

useEffect(()=>{
  if(data){
    setformData({company_name:data.company_name,
    position:data.title,
    location:data.location,
    description:data.job_description,
    salary:data.salary,
    skills:data.requirements,
    jobType:data.jobType,
    status:data.status,
    jobId:data._id})
  }
},[data])

const handleUpdate= async (jobId)=>{
  try{
    if(jobId===undefined || jobId===null || jobId===''){
      return
    }
    else{  
    const url=`${import.meta.env.VITE_REACT_APP_BASE_URL}api/jobs/update/job/${jobId}`
    const headers={
      "Content-Type":"application/json",
      'Authorization': `Bearer ${Cookies.get('jwtToken')}`
    }
    const data={
      company_name:formData.company_name,
      title:formData.position,
      location:formData.location,
      job_description:formData.description,
      salary:formData.salary,
      jobType:formData.jobType,
      status:formData.status,
      requirements:formData.skills,
      jobId:formData.jobId
    }
    const response=await axios.put(url,data,{headers})
    window.location.reload()
    handleClose()
  }
  }
  catch(error){
    toast.error(error.message)
  }
}


  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
    const formDatadefault = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formDatadefault.entries())
    const newData={
      company_name:formData.company_name,
      title:formData.position,
      location:formData.location,
      job_description:formData.description,
      salary:formData.salary,
      jobType:formData.jobType,
      status:formData.status,
      requirements:formData.skills,
    }

    const headers={
      'Content-Type':'application/json',
      'Authorization': `Bearer ${Cookies.get('jwtToken')}`
    }
    
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}api/jobs/createjob`,newData,{headers});
    if (response.status === 201 || response.status === 200) {
      toast.success('Job created successfully');
      handleClose();
      window.location.reload();
    } else {
      toast.error('Job creation failed');
    }
  }
  catch(error){
    if (error.response && error.response.data && error.response.data.message) {
      console.error('Error:', error.response.data.message);
      toast.error(error.response.data.message);
  } else {
      console.error('Error:', error.message || error);
      toast.error('An unexpected error occurred.');
  }
}
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
       <div className="card-container">
         <DialogTitle style={{color: 'white'}}>Add a New Job Posting</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <form onSubmit={handleSubmit} id="subscription-form" className="text">
           { /*<TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"

              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />*/}
            <label htmlFor="name" className="username-heading">Company/Organisation Name</label>
            <input type="text" name="name"  label="Company/Organisation Name" className="username" value={formData.company_name} onChange={e => setformData({...formData, company_name: e.target.value})} required/>
            <label htmlFor="position" className="username-heading">Job Title</label>
            <input type="text" name="position"  label="Job Title" className="username" value={formData.position} onChange={e => setformData({...formData, position: e.target.value})} required/>
            <label htmlFor="location" className="username-heading">Location</label>
            <input type="text" name="location"  label="Location" className="username" value={formData.location} onChange={e => setformData({...formData, location: e.target.value})} required/>
            <label htmlFor="description" className="username-heading">Job Description</label>
            <textarea name="description" label="Job Description"  rows="5" cols="6" className="username" value={formData.description} onChange={e => setformData({...formData, description: e.target.value})} required></textarea>
            <label htmlFor="skills" className="username-heading">Skills</label>
            <input type="text" name="skills" label="Skills" className="username" value={formData.skills} onChange={e => setformData({...formData, skills: e.target.value})} required/>
             <label htmlFor="type" className="username-heading">Job Type</label>
            <select name="type" className="username for-select" value={formData.jobType} onChange={e => setformData({...formData, jobType: e.target.value})} required>
              <option value="Full-Time">Full-time</option>
              <option value="Part-Time">Part-time</option>
              <option value="Internship">Internship</option>
            </select>
            <label htmlFor="package" className="username-heading">Salary</label>
            <input type="text" name="package" label="Salary" className="username" value={formData.salary} onChange={e => setformData({...formData, salary: e.target.value})} required/>
            <label htmlFor='status' className='username-heading'>Status</label>
            <select name='status' className='username for-select' value={formData.status} onChange={e => setformData({...formData, status: e.target.value})} required>
              <option value='Open'>Open</option>
              <option value='Closed'>Closed</option>
            </select>




            {/*<TextField name="position"  label="Job Title" fullWidth margin="dense" className="text" required />
            <TextField name="company"  label="Company Name" fullWidth margin="dense" required />
            <TextField name="location"  label="Location" fullWidth margin="dense" required />
            <TextField name="description" label="Job Description" multiline minRows={3} maxRows={7} fullWidth margin="dense" required />
            <TextField name="skills" label="Skills" fullWidth margin="dense" required color="paper"/>
            <TextField name="type" label="Job Type" fullWidth margin="dense" required />
            <TextField name="package" label="Salary" fullWidth margin="dense" required />*/}
          </form>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose} className='login-button'>Cancel</button>
          {dialog === "create" &&<button type="submit" form="subscription-form" className="login-button">
            Post
          </button>}
          {
            dialog==="edit" && <button type="button" className="login-button" onClick={()=>handleUpdate(formData.jobId)}>
            Update
          </button>
          }
        </DialogActions>
        </div>
      </Dialog>
    </React.Fragment>
  );
}
