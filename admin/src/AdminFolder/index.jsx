import {useState,useEffect} from 'react'
import JobsPosted from '../JobsPosted'
import ApplicationsTab from '../ApplicationsTab'
import RecruiterForm from '../RecruiterForm'
import SettingsTab from '../Settings'
import FormDialog from '../Modal';
import Cookies from 'js-cookie'
import axios from 'axios'
import {  Settings, Briefcase, FileText,Search, Plus,User} from 'lucide-react';
    import './index.css'

    const AdminFolder=()=> {
        const [activeOption, setActiveOption] = useState('Jobs');
        const [jobType, setJobType] = useState('All Types');
        const [isProfileCompleted,setIsProfileCompleted]=useState(false)

        const getProfile=async()=>{
            const url=`${import.meta.env.VITE_REACT_APP_BASE_URL}api/jobs/get/isrecruiterverified`
            const headers={
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('jwtToken')}`
            }
            const response=await axios.get(url,{headers})
            if(response.status===200 || response.statusText==='OK'){
                setIsProfileCompleted(response.data.iscompleted)
            
            }
        }


        useEffect(()=>{
            getProfile()
        },[])

        const Jobs=()=>{
            setActiveOption("Jobs")
        }

        const Internships=()=>{
            setActiveOption("Internships")
        }

        const Applications=()=>{
            setActiveOption("Applications")
        }

        const Settingstab=()=>{
            setActiveOption("Settings")
        }

        const changeType=(event)=>{
            setJobType(event.target.value)
        }
        const Profiletab=()=>{
            setActiveOption("Profile")
        }

        return(
                <div className="as-container">
                    <div className="as-sidebar">
                        <h1 className="as-heading">Jobby</h1>
                        <p className="as-description">Admin dashboard</p>
                        <ul className="as-sidebar-items-container">
                            <li className={`as-sidebar-items ${activeOption==="Jobs"? "active":""}`} onClick={Jobs}>
                                <Briefcase className="as-icons"/>
                                <p className="as-sideheading">Jobs</p>
                            </li>
                            <li className={`as-sidebar-items ${activeOption==="Applications"? "active":""}`} onClick={Applications}>
                                <FileText className="as-icons"/> 
                                <p className="as-sideheading">Applications</p>
                            </li>
                            <li className={`as-sidebar-items ${activeOption==="Profile"? "active":""}`} onClick={Profiletab}>
                                <User className="as-icons"/>
                                <p className="as-sideheading">Profile</p>
                            </li>
                            <li className={`as-sidebar-items ${activeOption==="Settings"? "active":""}`} onClick={Settingstab}>
                                <Settings className="as-icons"/> 
                                <p className="as-sideheading">Settings</p>
                            </li>  
                        </ul>
                    </div>

                     {activeOption==="Jobs" && <JobsPosted jobType={jobType} changeType={changeType} isProfileCompleted={isProfileCompleted}/>}
                     {activeOption==="Applications" && <ApplicationsTab jobType={jobType} changeType={changeType}  isProfileCompleted={isProfileCompleted}/>}
                    {activeOption==="Profile" && <RecruiterForm isProfileCompleted={isProfileCompleted}/> }
                    {activeOption==="Settings" && <SettingsTab/>}

                </div>
            )
        }

    export default AdminFolder



    //, Eye, Edit, Trash2, Download, User, X, Star, Menu 