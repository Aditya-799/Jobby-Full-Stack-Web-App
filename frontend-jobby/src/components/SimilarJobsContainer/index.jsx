/*import {MdLocationOn} from 'react-icons/md'
import {FaSuitcase, FaStar} from 'react-icons/fa'

import './index.css'

const SimilarJobsContainer = props => {
  const {eachItem} = props
  const {
    companyLogoUrl,
    employmentType,
    location,
    jobDescription,
    rating,
    title,
    id,
  } = eachItem
  return (
    <div className="sj-container">
      <div className="card-top-inner-section">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h1 className="sj-desc-heading">Description</h1>
      <p className="job-desc desc-container">{jobDescription}</p>
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
    </div>
  )
}

export default SimilarJobsContainer
*/