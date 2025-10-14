import {Component} from 'react'
import {GridLoader} from 'react-spinners'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import ProfileContainer from '../ProfileContainer'
import CardContainer from '../CardContainer'
import Filters from '../Filters'
import axios from 'axios'
import Header from '../Header'
import './index.css'

class Jobs extends Component {
  state = {
    jobsList: [],
    searchInput: '',
    updatedList: [],
    minimumPackage: '',
    employmentType: '',
    isLoading: true,
    isFailure: false,
  }

  componentDidMount() {
    this.getJobs()
  }

  changedInput = event => {
    this.setState({searchInput: event.target.value})
  }

  convertTocamelCase = data => {
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
    this.setState({jobsList: newData, isLoading: false})
  }

  getJobs = async () =>{
    const {searchInput,minimumPackage,employmentType} = this.state
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
      this.convertTocamelCase(data)
    }
    else{
      console.log("error")
      this.setState({isLoading:false,isFailure:true})
    }
  }

  searched = event => {
    event.preventDefault()
    this.getJobs()
  }

  salaryChange = salary => {
    this.setState({minimumPackage: salary}, this.getJobs)
  }

  sendList = labelsList => {
    this.setState({employmentType: labelsList}, this.getJobs)
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <GridLoader color="#ffffff" height="50" width="50" />
    </div>
  )

  retryFetching = () => {
    this.setState({isFailure: false, isLoading: true}, this.getJobs)
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" className="logout" onClick={this.retryFetching}>
        Retry
      </button>
    </div>
  )

  rendernotfoundJobs = () => (
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

  render() {
    const {employmentTypesList=[], salaryRangesList=[]} = this.props
    const {isLoading, isFailure, jobsList, updatedList, searchInput} =
      this.state
    const newData = updatedList.length === 0 ? jobsList : updatedList
    if (newData.length === 0) {
    }
    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div className="jobs-inner-container">
            <div className="search-container">
              <input
                type="search"
                className="search-box"
                onChange={this.changedInput}
                value={searchInput}
                placeholder="Search"
              />
              <div className="search-icon-container">
                <button
                  type="button"
                  data-testid="searchButton"
                  className="search-icon-button"
                  onClick={this.searched}
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
                sendList={this.sendList}
                salaryChange={this.salaryChange}
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
                onChange={this.changedInput}
                value={searchInput}
                placeholder="Search"
              />
              <div className="search-icon-container">
                <button
                  type="button"
                  data-testid="searchButton"
                  className="search-icon-button"
                  onClick={this.searched}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
            </div>
            {isFailure ? (
              this.renderFailureView()
            ) : isLoading ? (
              this.renderLoader()
            ) : newData.length === 0 ? (
              this.rendernotfoundJobs()
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
}

export default Jobs
