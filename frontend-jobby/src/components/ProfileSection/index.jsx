import React, { useState } from 'react'
import Header from '../Header'
import './index.css'
const ProfileSection = () => {

const [formData,setformData]=useState({
  name:'',
  email:'',
  phone_number:'',
  skills:[],
  bio:''
})



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
    return(
      <>
        <Header />
        <div className='profile-section-container'>
          <h1 className="profile-heading">Complete Your profile</h1>
            <form className="profile-form">
              <label htmlFor="fullName" className="profile-label">Full Name</label>
            <input type="text" className='profile-input' placeholder='Full Name' onChange={e=>setformData({...formData,name:e.target.value})} value={formData.name}/>
            <label htmlFor="bio" className="profile-label">Bio</label>
            <textarea className='profile-text-input' placeholder='Bio' min-rows="2" rows="4" max-rows="7" onChange={e=>setformData({...formData,bio:e.target.value})} value={formData.bio}></textarea>
            <label htmlFor="phone" className="profile-label">Phone Number</label>
            <input type="text" className='profile-input' placeholder='Phone Number' onChange={e=>setformData({...formData,phone_number:e.target.value})} value={formData.phone_number}/>
            <label htmlFor="email" className="profile-label">Email:</label>
            <input type="email" className='profile-input' placeholder='Email' onChange={e=>setformData({...formData,email:e.target.value})} value={formData.email}/>
            <label htmlFor="skills" className="profile-label">Skills:</label>
            <input type="text" className='profile-input' placeholder='Skills (comma separated)' onChange={e=>setformData({...formData,skills:e.target.value})} value={formData.skills}/>
            <input type="file" className="Upload-resume" onChange={handleFileChange} accept="application/pdf application/doc application/docx"/>
             <br />
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
            <button type='button' className='profile-edit-btn'>Edit</button>
            <button type='button' className='profile-save-btn'>Save</button>

        </div>
        </>
    )
}

export default ProfileSection;