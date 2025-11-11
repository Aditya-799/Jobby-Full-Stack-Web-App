
import {Plus, Search,Trash,SquarePen} from 'lucide-react';
import {useState,useEffect} from 'react';
import axios from "axios"
import Cookies from 'js-cookie'
import './index.css';
import FormDialog from '../Modal';
import lockImage from '../assets/lock.png'
import { toast } from 'react-toastify';


const JobsPosted=(props)=> {
const {jobType, changeType} = props;
const [formOpen, setFormOpen] = useState(false);
const [editOpen, setEditOpen] = useState(false);
const [jobsData, setJobsData] = useState([]);
const [dataFetched, setDataFetched] = useState(null);
const [searchItem, setSearchItem] = useState('');
const [searchedData, setSearchedData] = useState([]);

const handleFormOpen = () => {
        setFormOpen(true);
};
const handleFormClose = () => {
    setFormOpen(false);
};

const handleEditOpen = async (jobId) => {
    try{
        const url=`${import.meta.env.VITE_REACT_APP_BASE_URL}api/jobs/get/job/${jobId}`
        const headers={
            "Content-type":"application/json",
            'Authorization': `Bearer ${Cookies.get('jwtToken')}`
        }
        const job=await axios.get(url,{headers})   
        setDataFetched(job.data)
        setEditOpen(true);
    }
    catch(error){
        
    }
  
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
        fetchData()
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

const getDatabysearch=(event)=>{
    const value=event.target.value
    setSearchItem(value)
    const filteredData=jobsData.filter((job)=>
        job.title.toLowerCase().includes(value.toLowerCase())   
    )
    setSearchedData(filteredData)
}

useEffect(() => {
  if(props.isProfileCompleted){fetchData()}
}, []);




return (
    <div className="as-content">
                    <>
                        <h2 className="asc-heading">Job Postings</h2>
                        <p className="asc-description">Manage your job postings and view applications</p>
                        {props.isProfileCompleted?(<>
                        <div className="menu-jobpostings">
                            <div className="asc-search-container">
                                <Search className="search-icon" />
                                <input type="search" className="Search-bar-job-postings" placeholder='Search Postings...' onChange={getDatabysearch} value={searchItem}/>
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
                            dialog="create"
                            data={dataFetched}
                            fetchData={fetchData}
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
                                        <SquarePen size={20} className="asc-icons" onClick={()=>handleEditOpen(job.id)}/></td>
                                        {editOpen && (
                        <FormDialog 
                            open={editOpen}
                            handleClose={handleEditClose}
                            dialog="edit"
                            data={dataFetched}
                            fetchData={fetchData}/>
                    )}

                                    </tr>
                                ))}
                                
                                </tbody>
                            </table>
                        </div>
                        </>):<div className="profile-not-completed menu-job-postings">
                                                    <img src={lockImage} alt="profile not completed" className="profile-not-completed-image" />
                                                    <p className="profile-not-completed-description">Complete your profile to view applications</p>
                                                </div>}
                        
                        </>
                    </div>
);
}

export default JobsPosted;