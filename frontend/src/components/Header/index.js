import { MdHome, MdExitToApp } from 'react-icons/md'
import { BsFillBriefcaseFill } from 'react-icons/bs'
import './index.css'

const Header = () => {

  return (
    <div className="top-section">
      <div className="website-icon">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="home-website-logo"
          />
      </div>

      <ul className="icons-container">
        <li className="hi">
            <MdHome className="icon" />
        </li>
        <li className="hi">
            <BsFillBriefcaseFill className="icon"/>
        </li>
        <li className="hi">
          <button className="icon-button">
            <MdExitToApp className="icon" />
          </button>
        </li>
      </ul>

      <div className="nav-items-section">
          <p>Home</p>

          <p>Jobs</p>
          <p>Jobs Applied</p>
      </div>
      <div className="nav-items-section">
        <button type="button" className="logout-button">
          Logout
        </button>
      </div>
    </div>
  )
}

export default Header