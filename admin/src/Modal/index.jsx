import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from 'react';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material';
import './index.css';
import { use } from 'react';



export default function FormDialog({open,handleClose}) {
 
const [formData,setformData]=useState({
  position:'',
  company:'',
  location:'',
  description:'',
  salary:'',
  skills:'',
  jobType:''
})


  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries())
    const response = axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}api/jobs/addjob`,{
      title,description,location,salary,requirements,jobType,status,company_name
    });
    handleClose();
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
            <label htmlFor="cname" className="username-heading">Company/Organisation Name</label>
            <input type="text" name="cname"  label="Company/Organisation Name" className="username" value={formData.company_name} onChange={e => setformData({...formData, company_name: e.target.value})} required/>
            <label htmlFor="position" className="username-heading">Job Title</label>
            <input type="text" name="position"  label="Job Title" className="username" value={formData.position} onChange={e => setformData({...formData, position: e.target.value})} required/>
            <label htmlFor="company" className="username-heading">Company Name</label>
            <input type="text" name="company"  label="Company Name" className="username" value={formData.company} onChange={e => setformData({...formData, company: e.target.value})} required/>
            <label htmlFor="location" className="username-heading">Location</label>
            <input type="text" name="location"  label="Location" className="username" value={formData.location} onChange={e => setformData({...formData, location: e.target.value})} required/>
            <label htmlFor="description" className="username-heading">Job Description</label>
            <textarea name="description" label="Job Description"  rows="5" cols="6" className="username" value={formData.description} onChange={e => setformData({...formData, description: e.target.value})} required></textarea>
            <label htmlFor="skills" className="username-heading">Skills</label>
            <input type="text" name="skills" label="Skills" className="username" value={formData.skills} onChange={e => setformData({...formData, skills: e.target.value})} required/>
             <label htmlFor="type" className="username-heading">Job Type</label>
            <select name="type" className="username for-select" value={formData.jobType} onChange={e => setformData({...formData, jobType: e.target.value})} required>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
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
          <button type="submit" form="subscription-form" className="login-button">
            Post
          </button>
        </DialogActions>
        </div>
      </Dialog>
    </React.Fragment>
  );
}
