import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <div className="home-bg-container">
    <Header />
    <div className="bottom-section">
      <div className="details-container">
        <h1 className="home-heading">Find the Job That Fits Your Life</h1>
        <p className="home-description">
          Millions of people are searching for jobs, salary, information,
          company reviews.Find the job that fits your abilities and potential.
        </p>
        <button type="button" className="logout-button button-find-jobs">
          <Link to="/jobs" className="find-jobs-button">
            Find Jobs
          </Link>
        </button>
      </div>
    </div>
  </div>
)
export default Home
