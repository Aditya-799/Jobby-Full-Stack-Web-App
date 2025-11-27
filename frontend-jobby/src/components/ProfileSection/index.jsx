import React, { useState, useContext } from 'react'
import { UserContext } from '../../Context/createContext'
import Header from '../Header'
import './index.css'
import axios from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import circle from '../../assets/circle.png'

const ProfileSection = () => {

  const [formData, setformData] = useState({
    name: '',
    phone_number: '',
    skills: [],
    bio: ''
  })
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [resumeUrl, setResumeUrl] = useState('')

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a resume first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file)

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}api/upload/resume`,
        formData,
        {
          headers: {
            "Authorization": `Bearer ${Cookies.get('userToken')}`
          },
        },

      );

      setMessage("Resume uploaded successfully");
      setResumeUrl(res.data.url)  
      const user = JSON.parse(localStorage.getItem('userData'))
      user.resumeUrl = res.data.url
      localStorage.setItem('userData', JSON.stringify(user))

    } catch (error) {
      console.error(error);
      setMessage("Upload failed: " + error.response?.data?.error);
    }
  }

  const usercontext = useContext(UserContext)


  const updateProfile = async (e) => {
    e.preventDefault()
    try {
      if (formData.name === "" || formData.phone_number === "" || formData.bio === "" || formData.skills.length === 0 || formData.resumeUrl === "") {
        toast.error('Please fill all the fields')
        return
      }
      const url = `${import.meta.env.VITE_REACT_APP_BASE_URL}api/users/update/profile`
      const headers = {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${Cookies.get('userToken')}`
      }
      const updatedData = {
        fullName: formData.name,
        phone_number: formData.phone_number,
        bio: formData.bio,
        skills: formData.skills.split(',').map(skill => skill.trim())
      }
      const response = await axios.put(url, updatedData, { headers })
      if (response.status === 200 || response.statusText === 'OK') {

        toast.success('Profile Updated Successfully')
        let user = JSON.parse(localStorage.getItem('userData'))
        user = { ...user, ...updatedData }
        localStorage.setItem('userData', JSON.stringify(user))
        usercontext.setUserData(user)
        localStorage.setItem('isProfileComplete', 'true')
        usercontext.setIsProfileComplete(true)
        setformData({
          name: '',
          phone_number: '',
          skills: [],
          bio: ''
        })
      }
    }
    catch (error) {
      toast.error('Profile Updation Failed' + error.message)
    }
  }


  return (
    <>
      <Header />
      <div className='profile-section-container'>
        <h1 className="profile-heading">Complete Your profile</h1>
        {JSON.parse(localStorage.getItem('isProfileComplete')) === false ? <>
          <form className="profile-form" onSubmit={updateProfile}>
            <label htmlFor="fullName" className="profile-label">Full Name</label>
            <input type="text" className='profile-input' placeholder='Full Name' onChange={e => setformData({ ...formData, name: e.target.value })} value={formData.name} />
            <label htmlFor="bio" className="profile-label">Bio</label>
            <textarea className='profile-text-input' placeholder='Bio' min-rows="2" rows="4" max-rows="7" onChange={e => setformData({ ...formData, bio: e.target.value })} value={formData.bio}></textarea>
            <label htmlFor="phone" className="profile-label">Phone Number</label>
            <input type="tel" className='profile-input' placeholder='Phone Number Ex: +919876543210'
              pattern="^(?:\+91|0)?[6-9]\d{9}$" maxLength='14' onChange={e => setformData({ ...formData, phone_number: e.target.value })} value={formData.phone_number} />
            <label htmlFor="skills" className="profile-label">Skills:</label>
            <input type="text" className='profile-input' placeholder='Skills (comma separated)' onChange={e => setformData({ ...formData, skills: e.target.value })} value={formData.skills} />
            <label htmlFor="resume" className="profile-label">Resume</label>
            <input type="file" className="Upload-resume" onChange={handleFileChange} accept="application/pdf application/doc application/docx" />
            <br />
            <a 
                  href={resumeUrl || JSON.parse(localStorage.getItem('userData')).resumeUrl} 
                  target="_blank" 
                  style={{ color: "#007bff", textDecoration: "underline", cursor: "pointer", marginRight: "15px" }}
                >
                  View Resume
                </a>
                <br/>
                <br/>
            <button
              onClick={handleUpload}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                width: "120px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Upload
            </button>
            {message && <p>{message}</p>}
            <button type='submit' className='profile-save-btn'>Update</button>
          </form>
        </> : <>
          <div className='recruiter-completed-container'>
            <div className="card-container-recruiter-form">
              <img src={circle} alt="profile-completed" className="profile-completed-icon" />
              <h3 className="recruiter-form-heading">Profile Completed</h3>
              <p className="recruiter-form-description">You have successfully completed your profile</p>
            </div>
          </div>
        </>}



      </div>
    </>
  )
}

export default ProfileSection;