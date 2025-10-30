
import {Plus, Search,Trash,SquarePen} from 'lucide-react';
import {useState,useEffect} from 'react';
import axios from "axios"
import Cookies from 'js-cookie'
import './index.css';
import FormDialog from '../Modal';
import { toast } from 'react-toastify';


const JobsPosted=(props)=> {
const {jobType, changeType} = props;
const [formOpen, setFormOpen] = useState(false);
const [editOpen, setEditOpen] = useState(false);
const [jobsData, setJobsData] = useState([]);

const handleFormOpen = () => {
        setFormOpen(true);
};
const handleFormClose = () => {
    setFormOpen(false);
};

const handleEditOpen = () => {
  setEditOpen(true);
};
const handleEditClose = () => {
  setEditOpen(false);
};

const deleteJob= async (jobId)=>{  
    try{
    const headers={
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Cookies.get('jwtToken')}`
    }
    const url=`${import.meta.env.VITE_REACT_APP_BASE_URL}api/jobs/delete/job/${jobId}`
    const response=await axios.delete(url,{headers})
    if(response.status===200 || response.statusText==='OK'){
        toast.success('Job Deleted Successfully')
        window.location.reload()
    }
    else{
        toast.error('Job Deletion Failed')
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
}


useEffect(() => {
  const fetchData = async () => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Cookies.get('jwtToken')}`
    };
    const url = `${import.meta.env.VITE_REACT_APP_BASE_URL}api/jobs/get/jobspostedbyrecruiter`;
    const response = await axios.get(url, { headers });
    const data=response.data
    setJobsData(data)
  };

  fetchData();
}, []);


return (
    <div className="as-content">
                    <>
                        <h2 className="asc-heading">Job Postings</h2>
                        <p className="asc-description">Manage your job postings and view applications</p>
                        <div className="menu-jobpostings">
                            <div className="asc-search-container">
                                <Search className="search-icon" />
                                <input type="search" className="Search-bar-job-postings" placeholder='Search Postings...'/>
                            </div>
                            <select className="asc-dropdown asc-search-container" onChange={changeType} value={jobType}>
                                <option className="asc-option">All Types</option>
                                <option className="asc-option">Jobs</option>
                                <option className="asc-option">Internships</option>
                            </select>
                            <button type="button" className="asc-addJobsbutton" onClick={handleFormOpen}><Plus size={20} className="asc-icons"/>Add New Posting</button>
                            {formOpen && (
                        <FormDialog 
                            open={formOpen}
                            handleClose={handleFormClose}
                        />
                    )}
                        </div>
                        <div className="Job-postings">
                            <table className="jp-table">
                                <tbody>
                                <tr className="table-line">
                                    <th className="table-heading title">Title</th>
                                    <th className="table-heading">Type</th>
                                    <th className="table-heading">Date</th>
                                    <th className="table-heading">Status</th>
                                    <th className="table-heading">Applications</th>
                                </tr>
                            
                                    {jobsData.map((job) => (
                                    <tr className="table-line" key={job.id}>
                                        <td className="table-heading title">{job.jobtitle}</td>
                                        <td className="table-heading data">{job.jobtype}</td>
                                        <td className="table-heading data">{job.date}</td>
                                        <td className="table-heading data">{job.status}</td>
                                        <td className="table-heading data">{job.applicantnumber}</td>
                                        <td className="table-heading data"><Trash size={20} className="asc-icons" onClick={() =>deleteJob(job.id)}/>
                                        <SquarePen size={20} className="asc-icons" onClick={handleEditOpen}/></td>
                                        {editOpen && (
                        <FormDialog 
                            open={editOpen}
                            handleClose={handleEditClose}
                        />
                    )}

                                    </tr>
                                ))}
                                
                                </tbody>
                            </table>
                        </div>
                        </>
                    </div>
);
}

export default JobsPosted;