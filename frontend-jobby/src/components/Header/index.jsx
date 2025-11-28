import { MdHome, MdExitToApp } from 'react-icons/md'
import { BsFillBriefcaseFill } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../Context/createContext'
import Cookies from 'js-cookie'
import './index.css'

const Header = () => {
  const navigate = useNavigate()
  const { setUserData, setIsProfileComplete } = useContext(UserContext)

  const handleLogout = () => {
    Cookies.remove('userToken')
    setUserData({});
    setIsProfileComplete(false);
    localStorage.removeItem('userData');
    localStorage.removeItem('isProfileComplete');
    localStorage.removeItem('role')
    navigate('/login', { replace: true })
  }

  return (
    <div className="top-section">
      <div className="website-icon">
        <Link to="/home">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="home-website-logo"
          />
        </Link>
      </div>

      <ul className="icons-container">
        <li className="hi">
          <Link to="/home" className="icon-link">
            <MdHome className="icon" />
          </Link>
        </li>
        <li className="hi">
          <Link to="/jobs" className="icon-link">
            <BsFillBriefcaseFill className="icon" />
          </Link>
        </li>
        <li className="hi">
          <button onClick={handleLogout} className="icon-button">
            <MdExitToApp className="icon" />
          </button>
        </li>
      </ul>
      {Cookies.get('userToken')!==undefined?(
        <>
      <div className="nav-items-section">
        <Link to="/home" className="nav-item">
          <p>Home</p>
        </Link>
        <Link to="/jobs" className="nav-item">
          <p>Jobs</p>
        </Link>
        <Link to="/jobs/applied" className="nav-item">
          <p>Jobs Board</p>
        </Link>
      </div>
      <div className="nav-items-section">
        <button type="button" className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      </>
      ):(
        <>
         <div className="nav-items-section">
          <Link to="/login" className="nav-item">
            <button type="button" className="logout-button">
          Signin
        </button>
        </Link>
        <Link>
        <button type="button" className="logout-button" onClick={handleLogout}>
          Signup
        </button>
        </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default Header