import {useState} from 'react'
import JobsPosted from '../JobsPosted'
import ApplicationsTab from '../ApplicationsTab'
import RecruiterForm from '../RecruiterForm'
import FormDialog from '../Modal';
import {  Settings, Briefcase, GraduationCap, FileText,Search, Plus,User} from 'lucide-react';
    import './index.css'

    const AdminFolder=()=> {
        const [activeOption, setActiveOption] = useState('Jobs');
        const [jobType, setJobType] = useState('All Types');

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
                            <li className={`as-sidebar-items ${activeOption==="Internships"? "active":""}`} onClick={Internships}>
                                <GraduationCap className="as-icons"/> 
                                <p className="as-sideheading">Internships</p>
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

                     {activeOption==="Jobs" && <JobsPosted jobType={jobType} changeType={changeType}/>}
                     {activeOption==="Applications" && <ApplicationsTab jobType={jobType} changeType={changeType}/>}
                    {activeOption==="Profile" && <RecruiterForm/>}

                </div>
            )
        }

    export default AdminFolder



    //, Eye, Edit, Trash2, Download, User, X, Star, Menu 