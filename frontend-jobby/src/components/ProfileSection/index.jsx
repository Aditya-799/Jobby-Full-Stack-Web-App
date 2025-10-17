import React, { useState } from 'react'

import './index.css'
const ProfileSection = () => {
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
  };
    return(
        <div className='profile-section-container'>
            <input type="text" className='profile-input' placeholder='Full Name'/>
            <textarea className='profile-input' placeholder='Bio'></textarea>
            <input type="text" className='profile-input' placeholder='Phone Number'/>
            <input type="email" className='profile-input' placeholder='Email'/>
            <input type="text" className='profile-input' placeholder='Skills (comma separated)'/>
            <input type="file" className="Upload-resume" onChange={handleFileChange} accept="application/pdf application/doc application/docx"/>
             <br />
      <button
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
      </button>
            <button type='button' className='profile-edit-btn'>Edit</button>
            <button type='button' className='profile-save-btn'>Save</button>

        </div>
    )
}

export default ProfileSection;