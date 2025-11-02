import React,{useState,useEffect} from 'react'
import Header from '../Header'
import Cookies from 'js-cookie'
import axios from 'axios'
import './index.css'

const AppliedJobsSection = () => {

  const [appliedJobs,setappliedJobs]=useState([{}])

    useEffect(()=>{
        getAppliedJobs()
    },[])

    

    const renderfoundJobs = () => (
  <div className="applied-job-outer-container">
    <ul>
      {appliedJobs.map(eachItem => (
        <li key={eachItem.id}>
          <div className="applied-job-container">
            <div className='company-details'>
              <div className='company-details-inner-container'>
                <div>
                  <img 
                    src={eachItem.company_logo_url} 
                    alt={eachItem.company_name} 
                    className="company-icon" 
                  />
                  <p className="job-type">{eachItem.jobtype}</p>
                </div>
                <div>
                  {/* ✅ Correct string interpolation */}
                  <p>{`${eachItem.company_name} (${eachItem.salary} LPA)`}</p>
                  <p>{eachItem.jobtitle}</p>
                </div>
              </div>
              <div className='rating-container'>
                <img 
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png" 
                  alt="star" 
                  className="star-icon" 
                />
                <p>{eachItem.rating}</p>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
)


    const rendernotfoundJobs = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="failure-view-image"
      />
      <h1 className="applied-jobs-heading">No Applied Jobs Found</h1>
    </div>
  )

  const getAppliedJobs=async ()=>{
    const jwtToken=Cookies.get('jwtToken')
    const url=`${import.meta.env.VITE_REACT_APP_BASE_URL}api/users/appliedjobs`
    const response=await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
    })
    if(response.status===200 || response.statusText==='OK'){
      const {data}=response
      console.log(data)
      setappliedJobs(data)
    }
    else{
      console.log("error")
    }
  }


    return (
        <>
        <Header />
        <div className="applied-jobs-bg-container">
            <h1 className="applied-jobs-heading">Applied Jobs</h1>
            {renderfoundJobs()}
        </div>
        </>
    )
}

export default AppliedJobsSection