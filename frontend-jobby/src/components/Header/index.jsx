import { MdHome, MdExitToApp } from 'react-icons/md'
import { BsFillBriefcaseFill } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    Cookies.remove('jwtToken')
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

      <div className="nav-items-section">
        <Link to="/home" className="nav-item">
          <p>Home</p>
        </Link>
        <Link to="/jobs" className="nav-item">
          <p>Jobs</p>
        </Link>
        <Link to="/jobs/applied" className="nav-item">
          <p>Jobs Applied</p>
        </Link>
      </div>
      <div className="nav-items-section">
        <button type="button" className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Header