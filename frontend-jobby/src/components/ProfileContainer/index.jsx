import {useState,useEffect,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {GridLoader} from 'react-spinners'
import {UserContext} from '../../Context/UserContext'
import exclamation from '../../assets/exclamation.png'
import Cookies from 'js-cookie'
import './index.css'
import axios from 'axios'

const ProfileContainer =()=> {
  const [updatedData,setupdatedData]=useState('')
  const [isdatafetched,setisdatafetched]=useState(false)
  const [isLoading,setisLoading]=useState(true)
  const navigate=useNavigate()
  const userContext=useContext(UserContext)

  useEffect(()=>{
    getProfiledetails()
  },[])

  const getProfiledetails = async () => {
    try{
    const response=await axios.get(
      `${import.meta.env.VITE_REACT_APP_BASE_URL}api/users/get/profile`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get('jwtToken')}`,
        }
      }
    )
        const {data}=response
        if (data.success===true) {
          localStorage.setItem('userData',JSON.stringify(data.user))
          setupdatedData(data.user)
          userContext.setUserData(data.user)
          userContext.setIsProfileComplete(data.user.isProfileComplete)
          setisdatafetched(true)
          setisLoading(false)
         /* this.setState({
            updatedData: data.user,
            isdatafetched: true,
            isLoading: false,*/
        }
        else {
          setisdatafetched(false)
          setisLoading(false)
          /*this.setState({isdatafetched: false, isLoading: false})*/
        }
      }
      catch(error) {
        console.log(error)
        setisdatafetched(false)
        setisLoading(false)
        /*this.setState({isdatafetched: false, isLoading: false})*/
      }
  }

  const renderProfileContainer = () => {
    return (
      <div className="profile-container" onClick={()=>navigate('/profile/section')}>
        <img width="80" height="80" src={updatedData.profilePic} alt="external-Profile-Avatar-web-and-networking-flat-circle-design-circle" className="profile-img"/>
        <h1 className="name" style={{marginTop: "10px"}}>{updatedData.fullName?updatedData.fullName.charAt(0).toUpperCase() + updatedData.fullName.slice(1):''}</h1>
        {userContext.isProfileComplete===false && <p className='pc-error-display'><img src={exclamation} alt='exclamation' className='error-icon'/> Complete your profile</p>}
      </div>
    )
  }

  const renderLoader = () => (
    <div className="loader-container failed-to-load">
      <GridLoader color="#ffffff" height="50" width="50" />
    </div>
  )

  const retryFetching = () => {
    setisdatafetched(false)
    setisLoading(true)
    getProfiledetails()
    /*this.setState(
      {isdatafetched: false, isLoading: true},
      this.getProfiledetails,
    )*/
  }

  const renderretryButton = () => (
    <div className="failed-to-load">
      <button type="button" className="logout" onClick={retryFetching}>
        Retry
      </button>
    </div>
  )

    return (
      <>
        {isLoading
          ? renderLoader()
          : isdatafetched
          ? renderProfileContainer()
          : renderretryButton()}
      </>
    )
  }


export default ProfileContainer
