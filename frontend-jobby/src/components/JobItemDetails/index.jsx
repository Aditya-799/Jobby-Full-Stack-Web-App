import {MdLocationOn} from 'react-icons/md'
import {FaSuitcase, FaStar, FaExternalLinkAlt,FaArrowLeft} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {useState,useEffect,useContext} from 'react'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'  
import SkillItem from '../SkillItem'
import {GridLoader} from 'react-spinners'
import { UserContext } from '../../Context/UserContext'
import exclamation from '../../assets/exclamation.png'
import axios from 'axios'
import Header from '../Header'
import './index.css'



const JobItemDetails = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [isFailure, setIsFailure] = useState(false)
  const [totalDetails, setTotalDetails] = useState({})
  const userContext=useContext(UserContext)
  /*state = {
    totalDetails: {},
    isLoading: true,
    isFailure: false,
  }*/
  const navigate = useNavigate()

  useEffect(() => {
    getJobDetails()
  }, [])


  const convertsimilarJobs = data => {
    const newData = data.map(eachItem => ({
      companyLogoUrl: eachItem.company_logo_url,
      employmentType: eachItem.employment_type,
      id: eachItem.id,
      jobDescription: eachItem.job_description,
      location: eachItem.location,
      rating: eachItem.rating,
      title: eachItem.title,
    }))
    return newData
  }



  const getJobDetails = async () => {
    // Alternative method: extract ID from URL directly
    const pathParts = window.location.pathname.split('/')
    const jobId = pathParts[pathParts.length - 1]
    const url = `${import.meta.env.VITE_REACT_APP_BASE_URL}api/jobs/get/jobdetails/${jobId}`
    const jwtToken = Cookies.get('jwtToken')
    const response = await axios(url, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type':'application/json'
      },
    })
    if(response.status===200 || response.statusText==='OK'){
      const {data}=response
      const jsonData=data 
      const updatedData = {
        companyLogoUrl: jsonData.company_logo_url,
        companyWebsiteUrl: jsonData.website_url,
        employmentType: jsonData.jobType,
        description: jsonData.description,
        location: jsonData.location,
        packagePerAnnum: jsonData.salary,
        jobDescription: jsonData.job_description,
        rating: jsonData.rating,
        skills:jsonData.requirements,
        title: jsonData.title,
        lifeAtCompany:jsonData.life_at_company
      }

      /*this.setState({totalDetails: updatedData, isLoading: false})*/
      setTotalDetails(updatedData)
      setIsLoading(false)
      
    }
     
     else {
      /*this.setState({isFailure: true, isLoading: false})*/
      setIsFailure(true)
      setIsLoading(false)
    }
  }

  const retryFetching = async () => {
    /*this.setState({isFailure: false, isLoading: true}, this.getJobDetails)*/
    setIsFailure(false)
    setIsLoading(true)
    await getJobDetails()
  }

  const ApplyJob=async ()=>{
    try{
      const pathParts = window.location.pathname.split('/')
    const jobId = pathParts[pathParts.length - 1]
    const url = `${import.meta.env.VITE_REACT_APP_BASE_URL}api/users/apply-job/${jobId}`
    const jwtToken = Cookies.get('jwtToken')
    const response = await axios.post(url,{}, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type':'application/json'
      },
    })
    if(response.status===200 || response.statusText==='OK'){
      toast.success("Job Applied Successfully")
    }
    else{
      toast.error("Job Not Applied")
    }
    }
    catch(error){
      console.error(error)
      toast.error("Job Application Failed")
    }
  }

  const renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" className="logout" onClick={retryFetching}>
        Retry
      </button>
    </div>
  )


  const renderLoader = () => (
    <div className="loader-container full-screen" data-testid="loader">
      <GridLoader color="#ffffff" height="50" width="50" />
    </div>
  )
  const goBack = () => {
    navigate('/jobs')
  }

  const renderContext = () => {
    /*const {totalDetails} = this.state*/
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      location,
      packagePerAnnum,
      jobDescription,
      rating,
      skills = [],
      title,
      lifeAtCompany
    } = totalDetails
    return (
      <>
      <div className="arrow-container">
        <button type="button" className="arrow-button" onClick={goBack}>
          <FaArrowLeft className="arrow-icon-jid" />
          </button>
      </div>
        <div className="jid-inner-container">
          <div className="card-top-section">
            <div className="card-top-inner-section">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="company-icon"
              />
              <div>
                <h1 className="jid-job-name1">{title}</h1>
                <div className="rating-container">
                  <FaStar className="star-icon" />
                  <p className="rating-value">{rating}</p>
                </div>
              </div>
            </div>
            <div className="card-top-bottom-section">
              <div className="card-icons-container">
                <div className="card-icon-container">
                  <MdLocationOn className="job-card-icon" />
                  <p>{location}</p>
                </div>
                <div className="card-icon-container">
                  <FaSuitcase className="job-card-icon" />

                  <p>{employmentType}</p>
                </div>
              </div>
              <p className="package">{packagePerAnnum} LPA</p>
            </div>
          </div>
          <div className="card-bottom-section">
            <div className="description-container">
              <h1 className="jid-job-name">Description</h1>
              {
                userContext.isProfileComplete===false ? (<div className='jid-error-container-disabled'><button className='logout-button-disabled'>Apply</button>
                <div className='jid-inner-error-container'><img src={exclamation} alt='error-logo' className='error-icon'/><p className="jid-error">Complete your profile to apply</p></div></div>) :(<button className='logout-button' onClick={ApplyJob}>Apply</button>)
              }
              
            </div>
            <p className="job-desc desc-container job-desc-new">{jobDescription}</p>
            <h1 className="jid-job-name">Skills</h1>
            <ul className="skills-container">
              {skills.map(eachItem => (
                <SkillItem key={eachItem} eachItem={eachItem} />
              ))}
            </ul>
            <div className="description-container">
            <h1 className="lac-heading">Life At Company</h1>
            <a href={companyWebsiteUrl} target="__blank" className="link-item">
                Visit
                <FaExternalLinkAlt className="link-icon" />
              </a>
              </div>
            <div className="life-at-company-container">
              <div className="lac-desc-container">
                <p className="job-desc-new">{lifeAtCompany}</p>
              </div>
              <div className="image-container">
                <img src={`/Assets/company-image.jpg`} alt="company" className="company-image" />
              </div>
            </div>
          </div>
        </div>
        {/*
        <div className="simliar-jobs-container">
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-job-items">
            {similarJobs.map(eachItem => (
              <SimilarJobsContainer key={eachItem.id} eachItem={eachItem} />
            ))}
          </ul>
        </div>
        */}
      </>
    )
  }

  //render() {
    //const {isLoading, isFailure} = this.state
    return (
      <>
        <Header />
        <div className="jid-bg-container">
          {isFailure
            ? renderFailureView()
            : isLoading
            ? renderLoader()
            : renderContext()}
        </div>
      </>
    )
  //}
}

export default JobItemDetails
