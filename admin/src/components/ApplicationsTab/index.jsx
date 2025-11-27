import {Plus, Search,Check,X, Eye} from 'lucide-react';
import {useEffect,useState} from 'react'
import axios from 'axios'
import lockImage from '../../assets/lock.png'
import Cookies from 'js-cookie'
import './index.css'

const ApplicationsTab=(props)=> {
const [applicantsData, setApplicantsData] = useState([]);
const [searchItem, setSearchItem] = useState('');
const [jobTypeLocal, setJobTypeLocal] = useState('All Types');
const [filteredJobs, setFilteredJobs] = useState([]);

const getAllJobs=async()=>{
    try{
        const url=`${import.meta.env.VITE_REACT_APP_BASE_URL}api/jobs/get/allapplicants`
        const headers={
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('recruiterToken')}`
        }
        const response=await axios.get(url,{headers})
        const data=response.data
        setApplicantsData(data)
        setFilteredJobs(data)
    }
    catch(error){
        console.error(error)
    }

}


const Jobaction=async (action,userId,jobId)=>{
    try{
        const url=`${import.meta.env.VITE_REACT_APP_BASE_URL}api/jobs/accept/applicant/job/`
        const headers={
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('recruiterToken')}`
        }
        const body={
            action:action,
            userId:userId,
            jobId:jobId
        }

        const response=await axios.post(url,JSON.stringify(body),{headers})
        if(response.status===200){
            const data=response.data
            console.log(data)
            window.location.reload()
        }
    }
    catch(error){
        console.error(error)
    }
}

const viewResume=(userId)=>{
    const url=applicantsData.filter(each=>each.userId===userId)
    window.open(url[0].resumeUrl)
}

const getDataBysearch=(e)=>{
    const searchTerm = e.target.value.toLowerCase();
    setSearchItem(searchTerm);
    let data = applicantsData;
    data = data.filter((job) =>
        job.jobtitle.toLowerCase().includes(searchItem.toLowerCase())
      );
    setFilteredJobs(data);
}

const FilterData = (e) => {
    const type = e.target.value;
    setJobTypeLocal(type);

    let data = applicantsData;

    if (type === "Internships") {
      data = data.filter((job) =>
        job.jobtype.toLowerCase() === "Internship".toLowerCase()
      );
    } else if (type === "Jobs") {
      data = data.filter((job) =>
        job.jobtype.toLowerCase() === "Full-time".toLowerCase() || job.jobtype.toLowerCase() === "Part-time".toLowerCase()
      );
    }

    if (searchItem !== "") {
      data = data.filter((job) =>
        job.jobtitle.toLowerCase().includes(searchItem.toLowerCase())
      );
    }

    setFilteredJobs(data);
  };


useEffect(()=>{
if(props.isProfileCompleted)getAllJobs()
},[props.isProfileCompleted])

return (
    <div className="as-content">
                    <>
                        <h2 className="asc-heading">Applications</h2>
                        <p className="asc-description">Review and manage candidateapplications</p>
                        {props.isProfileCompleted? <>
                        <div className="menu-jobpostings">
                            <div className="asc-search-container">
                                <Search className="search-icon" />
                                <input type="search" className="Search-bar-job-postings" placeholder='Search Applications...' onChange={getDataBysearch}/>
                            </div>
                            <select className="asc-dropdown asc-search-container" onChange={FilterData} value={jobTypeLocal}>
                                <option className="asc-option">All Types</option>
                                <option className="asc-option">Jobs</option>
                                <option className="asc-option">Internships</option>
                            </select>
                        </div>
                        <div className="Job-postings">
                            <table className="jp-table">
                                <tbody>
                                <tr className="table-line">
                                    <th className="table-heading title">Applicant</th>
                                    <th className="table-heading">Job Title</th>
                                    <th className="table-heading">Status</th>
                                    <th className="table-heading">Match Score</th>
                                    <th className="table-heading">Actions</th>
                                </tr>
                                {
                                filteredJobs.map((each)=>(
                                    <tr className="table-line" key={each.id}>
                                    <td className="table-heading title">
                                        <div className="role-container">
                                            <p className="role">{each.name}</p>
                                            <p className="asc-description">{each.email}</p>
                                        </div></td>

                                    <td className="table-heading data"><div className="role-container">
                                            <p className="role">{each.jobtitle}</p>
                                            <p className="asc-description">{each.jobtype}</p>
                                        </div></td>
                                    <td className="table-heading data">Active</td>
                                    <td className="table-heading data">Applications</td>
                                    <td className="table-heading data"><div className="">
                                        <Check className="check-icon" onClick={()=>(Jobaction('accept',each.userId,each.id))}/>
                                        <X className="cross-icon" onClick={()=>(Jobaction('reject',each.userId,each.id))}/>
                                        <Eye className='cross-icon'onClick={()=>(viewResume(each.userId))}/>
                                        </div></td>
                                </tr>
                                ))
                                }
                                </tbody>
                            </table>
                        </div>
                        </> : <div className="profile-not-completed menu-job-postings">
                            <img src={lockImage} alt="profile not completed" className="profile-not-completed-image" />
                            <p className="profile-not-completed-description">Complete your profile to view applications</p>
                        </div>}
                        
                        </>
                    </div>
)
}

export default ApplicationsTab