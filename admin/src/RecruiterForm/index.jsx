
import {Plus, Search} from 'lucide-react';
import {useState,useEffect} from 'react';
import './index.css';
import Cookies from 'js-cookie'
import axios from 'axios';
import FormDialog from '../Modal';
import circle  from '../assets/circle.png'
import { toast } from 'react-toastify';

const JobsPosted=(props)=> {
const [formrecruiterData,setformrecruiterdata]=useState({
    recruiterName:"",
    recruiterEmail:"",
    recruiterPhone:"",
    companyName:"",
    companyAddress:"",
    companyWebsiteUrl:"",
    companyLogoUrl:"",
    companyNumber:"",
    companyReviews:"",
    companyCityLocation:'',
    companyLinkedinUrl:"",
    companycoorparateEmail:""
})

const updateProfile=async(event)=>{
    event.preventDefault()
       const url=`${import.meta.env.VITE_REACT_APP_BASE_URL}api/jobs/update/recruiterprofile`
       const headers={
        'Content-type':'application/json',
        'Authorization': `Bearer ${Cookies.get('jwtToken')}`
       }
       const updatedData={
        fullName:formrecruiterData.recruiterName,
        email:formrecruiterData.recruiterEmail,
        phone:formrecruiterData.recruiterPhone,
        companyName:formrecruiterData.companyName,
        companyAddress:formrecruiterData.companyAddress,
        companyWebsiteUrl:formrecruiterData.companyWebsiteUrl,
        companyLogoUrl:formrecruiterData.companyLogoUrl,
        companyReview:formrecruiterData.companyReviews,
        companyContactNumber:formrecruiterData.companyNumber,
        companyLocation:formrecruiterData.companyCityLocation,
        companyLinkedInUrl:formrecruiterData.companyLinkedinUrl,
        companyCorporateEmail:formrecruiterData.companycoorparateEmail
       }
       const response=await axios.post(url,updatedData,{headers})
       console.log(response)
       if(response.status===200 || response.statusText==='OK'){
           toast.success('Recruiter Profile Updated Successfully')
           setformrecruiterdata({ recruiterName:"",
    recruiterEmail:"",
    recruiterPhone:"",
    companyName:"",
    companyAddress:"",
    companyWebsiteUrl:"",
    companyLogoUrl:"",
    companyNumber:"",
    companyReviews:"",
    companyCityLocation:'',
    companyLinkedinUrl:"",
    companycoorparateEmail:""})
           window.location.reload()

       }
       else{
        toast.error('Recruiter Profile Updation Failed')
       }
}



return (
    <div className="as-content">
        <>
            <h2 className="asc-heading">Recruiter Profile</h2>
            <p className="asc-description">Complete your recruiter profile to unlock Job posting feature</p>
            <div className="outer-container">
                
                {props.isProfileCompleted === false ? <>
                <div className="card-container">
                <form className='rectruiter-form' onSubmit={updateProfile}>
                    <label className="label-find-jobs">Recruiter Name</label><br/>
                    <input type="text" placeholder="Enter Recruiter Name" className="input-find-jobs" onChange={(event)=>{setformrecruiterdata({...formrecruiterData,recruiterName:event.target.value})}} value={formrecruiterData.recruiterName}/><br/>
                    <label className="label-find-jobs">Recruiter Email</label><br/>
                    <input type="email" placeholder="Enter Recruiter Email" className="input-find-jobs" onChange={(event)=>{setformrecruiterdata({...formrecruiterData,recruiterEmail:event.target.value})}} value={formrecruiterData.recruiterEmail}/><br/>
                    <label className="label-find-jobs">Recruiter Phone</label><br/>
                    <input type="tel" maxLength="10" placeholder="Enter Recruiter Phone" className="input-find-jobs" onChange={(event)=>{setformrecruiterdata({...formrecruiterData,recruiterPhone:event.target.value})}} value={formrecruiterData.recruiterPhone}/><br/>
                    <label className="label-find-jobs">Company Name</label><br/>
                    <input type="text" placeholder="Enter company name" className="input-find-jobs" onChange={(event)=>{setformrecruiterdata({...formrecruiterData,companyName:event.target.value})}} value={formrecruiterData.companyName}/><br/>
                    <label className="label-find-jobs">Company Website Url</label><br/>
                    <input type="url" placeholder="Enter company website url" className="input-find-jobs" onChange={(event)=>{setformrecruiterdata({...formrecruiterData,companyWebsiteUrl:event.target.value})}} value={formrecruiterData.companyWebsiteUrl}/><br/>
                    <label className="label-find-jobs">Company Logo Url</label><br/>
                    <input type="url" placeholder="Enter company logo url" className="input-find-jobs" onChange={(event)=>{setformrecruiterdata({...formrecruiterData,companyLogoUrl:event.target.value})}} value={formrecruiterData.companyLogoUrl}/><br/>
                    <label className="label-find-jobs">Company Reviews</label><br/>
                    <input type="number" placeholder="Enter company Reviews" className="input-find-jobs" onChange={(event)=>{setformrecruiterdata({...formrecruiterData,companyReviews:event.target.value})}} value={formrecruiterData.companyReviews}/><br/>
                    <label className="label-find-jobs">Company Number</label><br/>
                    <input tye="tel" maxLength="10"placeholder="Enter company Number" className="input-find-jobs" onChange={(event)=>{setformrecruiterdata({...formrecruiterData,companyNumber:event.target.value})}} value={formrecruiterData.companyNumber}/><br/>
                    <label className="label-find-jobs">Company City Location</label><br/>
                    <input type="text" placeholder="Enter company City Location" className="input-find-jobs" onChange={(event)=>{setformrecruiterdata({...formrecruiterData,companyCityLocation:event.target.value})}} value={formrecruiterData.companyCityLocation}/><br/>
                    <label className='label-find-jobs'>Company Address</label><br/>
                    <input type="text" placeholder="Enter company Address" className="input-find-jobs" onChange={(event)=>{setformrecruiterdata({...formrecruiterData,companyAddress:event.target.value})}} value={formrecruiterData.companyAddress}/><br/>
                    <label className="label-find-jobs">Company LinkedIn Profile Url</label><br/>
                    <input type="url" placeholder="Enter company linked in profile url" className="input-find-jobs" onChange={(event)=>{setformrecruiterdata({...formrecruiterData,companyLinkedinUrl:event.target.value})}} value={formrecruiterData.companyLinkedinUrl}/><br/>
                    <label className="label-find-jobs">Company Coorporate Email</label><br/>
                    <input type="email" placeholder="Enter company coorporate email address" className="input-find-jobs" onChange={(event)=>{setformrecruiterdata({...formrecruiterData,companycoorparateEmail:event.target.value})}} value={formrecruiterData.companycoorparateEmail}/><br/>
                    <button type="submit" className="button-find-jobs">Update</button>
                </form>
                </div>
                </>: <>
                <div className='recruiter-completed-container'>
                <div className="card-container-recruiter-form">
                    <img src={circle} alt="profile-completed" className="profile-completed-icon"/>                  
                    <h3 className="recruiter-form-heading">Recruiter Profile Completed</h3>
                    <p className="recruiter-form-description">You have successfully completed your recruiter profile</p>
                </div>
                </div>
                </> }
            </div>            
        </>
    </div>
);
}

export default JobsPosted;