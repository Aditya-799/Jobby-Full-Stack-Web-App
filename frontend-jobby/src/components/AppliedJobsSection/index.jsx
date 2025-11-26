import React,{useState,useEffect} from 'react'
import Header from '../Header'
import Cookies from 'js-cookie'
import axios from 'axios'
import './index.css'

const AppliedJobsSection = () => {

  const [appliedJobs,setappliedJobs]=useState([])
  const [acceptedJobs,setacceptedJobs]=useState([])
  const [rejectedJobs,setrejectedJobs]=useState([])
  const [selectedOption,setselectedOption]=useState('Applied Jobs')



  useEffect(() => {
  if (selectedOption === "Applied Jobs") {
    getAppliedJobs();
  } else if (selectedOption === "Accepted Jobs") {
    getAcceptedJobs();
  } else if (selectedOption === "Rejected Jobs") {
    getRejectedJobs();
  }
}, [selectedOption]);   // runs only when option changes

    const renderfoundJobs = (items) => (
  <div className="applied-job-outer-container">
    <ul>
      {items.map(eachItem => (
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


    const rendernotfoundJobs = (text) => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="failure-view-image"
      />
      <h1 className="applied-jobs-heading">{`No ${text} Jobs Found`}</h1>
    </div>
  )

  const getAppliedJobs=async ()=>{
    const jwtToken=Cookies.get('userToken')
    const url=`${import.meta.env.VITE_REACT_APP_BASE_URL}api/users/appliedjobs`
    const response=await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
    })
    if(response.status===200 || response.statusText==='OK'){
      const {data}=response
      setappliedJobs(data)
    }
    else{
      console.log("error")
    }
  }

  const getAcceptedJobs=async ()=>{
    try{
      const jwtToken=Cookies.get('userToken')
      const url=`${import.meta.env.VITE_REACT_APP_BASE_URL}api/users/accepted-jobs`
      const response=await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
      })
      if(response.status===200 || response.statusText==='OK'){
        const {data}=response
        setacceptedJobs(data)
      }
      else{
        console.log("error")
      }
    }
    catch(error){
      console.log(error)
    }
  }

  const getRejectedJobs=async ()=>{
    try{
      const jwtToken=Cookies.get('userToken')
      const url=`${import.meta.env.VITE_REACT_APP_BASE_URL}api/users/rejected-jobs`
      const response=await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
      })

      if(response.status===200 || response.statusText==='OK'){
        const {data}=response
        setrejectedJobs(data)
      }
      else{
        console.log("error")
      }
    }
    catch(error){
      console.log(error)
    }
  }

  const renderselectedOptionJobs=()=>{
    if(selectedOption==="Applied Jobs"){
      return appliedJobs.length===0 ? rendernotfoundJobs('Applied') : renderfoundJobs(appliedJobs)
    } else if(selectedOption==="Accepted Jobs"){
      return acceptedJobs.length===0 ? rendernotfoundJobs('Accepted') : renderfoundJobs(acceptedJobs)
    } else if(selectedOption==="Rejected Jobs"){
      return rejectedJobs.length===0 ? rendernotfoundJobs('Rejected') : renderfoundJobs(rejectedJobs)
    }
  }

  return (
        <>
        <Header />
        <div className="applied-jobs-bg-container">
            <h1 className="applied-jobs-heading">Applied Jobs</h1>
            <select className="applied-jobs-sortby-dropdown" value={selectedOption} onChange={(e)=>setselectedOption(e.target.value)}>
              <option value="Applied Jobs" className="aj-options">Applied Jobs</option>
              <option value="Accepted Jobs" className="aj-options">Accepted Jobs</option>
              <option value="Rejected Jobs" className="aj-options">Rejected Jobs</option>
            </select>

            {renderselectedOptionJobs()}
        </div>
        </>
    )
}

export default AppliedJobsSection