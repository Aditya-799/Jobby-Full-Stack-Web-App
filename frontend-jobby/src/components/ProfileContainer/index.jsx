import {Component} from 'react'
import {GridLoader} from 'react-spinners'
import Cookies from 'js-cookie'
import './index.css'
import axios from 'axios'

class ProfileContainer extends Component {
  state = {updatedData: '', isdatafetched: false, isLoading: true}

  componentDidMount() {
    this.getProfiledetails()
  }

  getProfiledetails = async () => {
    axios.get(
      `${import.meta.env.VITE_REACT_APP_BASE_URL}api/users/get/profile`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('jwtToken')}`,
        },
      },
    )
      .then(response => {
        const {data}=response
        if (data.success===true) {
          this.setState({
            updatedData: data.user,
            isdatafetched: true,
            isLoading: false,
          })
        } else {
          this.setState({isdatafetched: false, isLoading: false})
        }
      })
      .catch(() => {
        this.setState({isdatafetched: false, isLoading: false})
      })
  }

  renderProfileContainer = () => {
    const {updatedData} = this.state
    return (
      <div className="profile-container">
        <img width="80" height="80" src={updatedData.profilePic} alt="external-Profile-Avatar-web-and-networking-flat-circle-design-circle" className="profile-img"/>
        <h1 className="name" style={{marginTop: "10px"}}>{updatedData.fullName.charAt(0).toUpperCase() + updatedData.fullName.slice(1)}</h1>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container failed-to-load" data-testid="loader">
      <GridLoader color="#ffffff" height="50" width="50" />
    </div>
  )

  retryFetching = () => {
    this.setState(
      {isdatafetched: false, isLoading: true},
      this.getProfiledetails,
    )
  }

  renderretryButton = () => (
    <div className="failed-to-load">
      <button type="button" className="logout" onClick={this.retryFetching}>
        Retry
      </button>
    </div>
  )

  render() {
    const {isdatafetched, isLoading} = this.state
    return (
      <>
        {isLoading
          ? this.renderLoader()
          : isdatafetched
          ? this.renderProfileContainer()
          : this.renderretryButton()}
      </>
    )
  }
}

export default ProfileContainer
