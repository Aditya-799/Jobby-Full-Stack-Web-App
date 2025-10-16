import {useState,useEffect} from 'react'
import {GridLoader} from 'react-spinners'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import ProfileContainer from '../ProfileContainer'
import CardContainer from '../CardContainer'
import Filters from '../Filters'
import axios from 'axios'
import Header from '../Header'
import './index.css'

const Jobs = (props) => {
   const [isLoading,setIsLoading]=useState(true)
   const [jobsList,setJobsList]=useState([])
   const [searchInput,setSearchInput]=useState('')
   const [minimumPackage,setMinimumPackage]=useState('')
   const [employmentType,setEmploymentType]=useState('')
   const [isFailure,setIsFailure]=useState(false)
   const [updatedList,setUpdatedList]=useState([])

   useEffect(()=>{
      getJobs()
   },[])

   const changedInput = event => {
     setSearchInput(event.target.value)
   }

  const convertTocamelCase = data => {
    const newData = data.map(eachItem => ({
      companyLogoUrl: eachItem.company_logo_url,
      employmentType: eachItem.jobType,
      id: eachItem._id,
      jobDescription: eachItem.description,
      Requirements:eachItem.requirements,
      location: eachItem.location,
      packagePerAnnum: eachItem.salary,
      rating: eachItem.rating,
      title: eachItem.title,
      jobApplicants:eachItem.jobApplicants,
      status:eachItem.status
    }))
    setIsLoading(false)
    setJobsList(newData)
    setUpdatedList(newData)
    
  }

  useEffect(()=>{
    getJobs()
  },[minimumPackage,employmentType])

  const getUpdatedList = () => {
    const filteredData = jobsList.filter(eachItem =>
      eachItem.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    setUpdatedList(filteredData)
  }

 const getJobs = async () =>{
    const employementlist=employmentType.trim().split(',')
    const url = `http://localhost:8000/api/jobs/get/alljobs?search_q=${searchInput}&minimum_package=${minimumPackage}&employementType=${employementlist}`
    const jwtToken = Cookies.get('jwtToken')
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      }
    })
    if(response.status===200 || response.statusText==='OK'){
      const {data}=response
      convertTocamelCase(data)
    }
    else{
      console.log("error")
      setIsLoading(false)
      setIsFailure(true)
    }
  }

  const searched = event => {
    event.preventDefault()
    getUpdatedList();
    
  }


  const salaryChange = salary => {
    setMinimumPackage(salary)
  };
  

  const sendList = labelsList => {
    setEmploymentType(labelsList)
  }

  const renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <GridLoader color="#ffffff" height="50" width="50" />
    </div>
  )

  const retryFetching = () => {
    setIsFailure(false)
    setIsLoading(true)
    getJobs()
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

  const rendernotfoundJobs = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="failure-view-image"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs.Try other filters.</p>
    </div>
  )

    const {employmentTypesList=[], salaryRangesList=[]} = props
    const newData = updatedList.length === 0 ? jobsList : updatedList
    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div className="jobs-inner-container">
            <div className="search-container">
              <input
                type="search"
                className="search-box"
                onChange={changedInput}
                value={searchInput}
                placeholder="Search"
              />
              <div className="search-icon-container">
                <button
                  type="button"
                  data-testid="searchButton"
                  className="search-icon-button"
                  onClick={searched}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
            </div>
            
              <div className="profile-and-filters">
              <ProfileContainer />
              <Filters
                employmentTypesList={employmentTypesList}
                salaryRangesList={salaryRangesList}
                sendList={sendList}
                salaryChange={salaryChange}
              />
              </div>
              </div>
           
          <h1 className="toe">Type of Employment</h1>
          <h1 className="toe">Salary Range</h1>
          
            <div className="jobs-section-container">
            <div className="search-container1">
              <input
                type="search"
                className="search-box"
                onChange={changedInput}
                value={searchInput}
                placeholder="Search"
              />
              <div className="search-icon-container">
                <button
                  type="button"
                  data-testid="searchButton"
                  className="search-icon-button"
                  onClick={searched}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
            </div>
            {isFailure ? (
              renderFailureView()
            ) : isLoading ? (
              renderLoader()
            ) : newData.length === 0 ? (
              rendernotfoundJobs()
            ) : (
              <ul className="all-cards-container">
                {newData.map(eachItem => (
                  <CardContainer key={eachItem.id} eachItem={eachItem} />
                ))}
              </ul>
            )}
          </div>
          </div>
        
      </>
    )
  }

export default Jobs
