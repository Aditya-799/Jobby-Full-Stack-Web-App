import {Component} from 'react'
import {GridLoader} from 'react-spinners'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import ProfileContainer from '../ProfileContainer'
import CardContainer from '../CardContainer'
import Filters from '../Filters'
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
      employmentType: eachItem.employment_type,
      id: eachItem.id,
      jobDescription: eachItem.job_description,
      location: eachItem.location,
      packagePerAnnum: eachItem.package_per_annum,
      rating: eachItem.rating,
      title: eachItem.title,
    }))
    this.setState({jobsList: newData, isLoading: false})
  }

  getJobs = async () => {
    const {employmentType, minimumPackage, searchInput} = this.state
    const url = `${process.env.REACT_APP_BACKEND_URL}api/get/AllJobs?employmentType=${employmentType}&search=${searchInput}&minimumPackage=${minimumPackage}`
    const jwtToken = Cookies.get('jwtToken')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const jsonData = await response.json()
      console.log(jsonData)
      this.convertTocamelCase(jsonData.jobs)
    } else {
      this.setState({isFailure: true})
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
