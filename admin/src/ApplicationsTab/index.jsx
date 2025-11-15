import {Plus, Search,Check,X} from 'lucide-react';
import {useEffect,useState} from 'react'
import axios from 'axios'
import lockImage from '../assets/lock.png'
import Cookies from 'js-cookie'
import './index.css'

const ApplicationsTab=(props)=> {
const {jobType, changeType} = props;
const [applicantsData, setApplicantsData] = useState([]);

const getAllJobs=async()=>{
    try{
        const url=`${import.meta.env.VITE_REACT_APP_BASE_URL}api/jobs/get/allapplicants`
        const headers={
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('jwtToken')}`
        }
        const response=await axios.get(url,{headers})
        const data=response.data
        console.log(data)
        setApplicantsData(data)
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
            'Authorization': `Bearer ${Cookies.get('jwtToken')}`
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
            windiow.location.reload()
        }
    }
    catch(error){
        console.error(error)
    }
}

useEffect(()=>{
if(props.isProfileCompleted)getAllJobs()
},[])

return (
    <div className="as-content">
                    <>
                        <h2 className="asc-heading">Applications</h2>
                        <p className="asc-description">Review and manage candidateapplications</p>
                        {props.isProfileCompleted? <>
                        <div className="menu-jobpostings">
                            <div className="asc-search-container">
                                <Search className="search-icon" />
                                <input type="search" className="Search-bar-job-postings" placeholder='Search Applications...'/>
                            </div>
                            <select className="asc-dropdown asc-search-container" onChange={changeType} value={jobType}>
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
                                applicantsData.map((each)=>(
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
                                        </div></td>
                                </tr>
                                ))
                                }
                                </tbody>
                            </table>
                        </div>
                        </> : <div className="profile-completed-menu-job-postings">
                            <img src={lockImage} alt="profile not completed" className="profile-not-completed-image" />
                            <p className="profile-not-completed-description">Complete your profile to view applications</p>
                        </div>}
                        
                        </>
                    </div>
)
}

export default ApplicationsTab