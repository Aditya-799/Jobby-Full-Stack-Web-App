import React, { useState,useContext } from 'react'
import { UserContext } from '../../Context/UserContext'
import Header from '../Header'
import './index.css'
import axios from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
const ProfileSection = () => {

const [formData,setformData]=useState({
  name:'',
  email:'',
  phone_number:'',
  skills:[],
  bio:''
})

const usercontext=useContext(UserContext)


/*
    const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [ImageUrl, setImageUrl] = useState(null);


    async function uploadFile(file) {
    try {
      setIsUploading(true);

      // Step 1: Ask backend for a signed URL
      const response = await fetch(
        `${VITE_REACT_APP_BASE_URL}/api/upload/generate-presigned-url?filename=${file.name}&contentType=${file.type}`
      );

      if (!response.ok) throw new Error("Failed to get presigned URL");

      const { uploadURL,publicUrl } = await response.json();
      console.log(uploadURL)

      await fetch(uploadURL, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });
    setImageUrl(publicUrl);
    console.log(ImageUrl);
      alert("Upload successful!");

      alert("✅ File uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("❌ Upload failed: " + error.message);
    } finally {
      setIsUploading(false);
    }
  }


     const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

    const handleUploadClick = () => {
    if (file) uploadFile(file);
    else alert("Please select a file first.");
  };*/
    const updateProfile=async(e)=>{
      e.preventDefault()
      try{
        if(formData.name==="" || formData.email==="" || formData.phone_number==="" || formData.bio==="" || formData.skills.length===0){
          toast.error('Please fill all the fields')
          return
        }
        const url=`${import.meta.env.VITE_REACT_APP_BASE_URL}api/users/update/profile`
        const headers={
         'Content-type':'application/json',
         'Authorization': `Bearer ${Cookies.get('jwtToken')}`
        }
        const updatedData={
          fullName:formData.name,
          email:formData.email,
          phone_number:formData.phone_number,  
          bio:formData.bio,
          skills:formData.skills.split(',').map(skill=>skill.trim())
        }
        const response=await axios.put(url,updatedData,{headers})
        console.log(response)
        if(response.status===200 || response.statusText==='OK'){
          
            toast.success('Profile Updated Successfully')
            let user=JSON.parse(localStorage.getItem('userData'))
            user={...user,...updatedData}
            localStorage.setItem('userData',JSON.stringify(user))
            usercontext.setUserData(user)
            localStorage.setItem('isProfileComplete','true')
            usercontext.setIsProfileComplete(true)
            setformData({
              name:'',
              email:'',
              phone_number:'',
              skills:[],
              bio:''
            })
        }
      }
      catch(error){
        toast.error('Profile Updation Failed' + error.message)
      }
        }


    return(
      <>
        <Header />
        <div className='profile-section-container'>
          <h1 className="profile-heading">Complete Your profile</h1>
            <form className="profile-form" onSubmit={updateProfile}>
              <label htmlFor="fullName" className="profile-label">Full Name</label>
            <input type="text" className='profile-input' placeholder='Full Name' onChange={e=>setformData({...formData,name:e.target.value})} value={formData.name}/>
            <label htmlFor="bio" className="profile-label">Bio</label>
            <textarea className='profile-text-input' placeholder='Bio' min-rows="2" rows="4" max-rows="7" onChange={e=>setformData({...formData,bio:e.target.value})} value={formData.bio}></textarea>
            <label htmlFor="phone" className="profile-label">Phone Number</label>
            <input type="tel" className='profile-input' placeholder='Phone Number Ex: +919876543210' 
            pattern="^(?:\+91|0)?[6-9]\d{9}$" maxLength='14' onChange={e=>setformData({...formData,phone_number:e.target.value})} value={formData.phone_number}/>
            <label htmlFor="email" className="profile-label">Email:</label>
            <input type="email" className='profile-input' placeholder='Email' onChange={e=>setformData({...formData,email:e.target.value})} value={formData.email}/>
            <label htmlFor="skills" className="profile-label">Skills:</label>
            <input type="text" className='profile-input' placeholder='Skills (comma separated)' onChange={e=>setformData({...formData,skills:e.target.value})} value={formData.skills}/>
            {/*<input type="file" className="Upload-resume" onChange={handleFileChange} accept="application/pdf application/doc application/docx"/>
             <br />*/}
             <button type='submit' className='profile-save-btn'>Update</button>
            </form>
      {/*<button
        onClick={handleUploadClick}
        disabled={!file || isUploading}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {isUploading ? "Uploading..." : "Upload"}
      </button>*/}
            

        </div>
        </>
    )
}

export default ProfileSection;