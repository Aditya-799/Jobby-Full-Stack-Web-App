import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import { FaSuitcase, FaStar } from 'react-icons/fa';
import './index.css';

const CardContainer = (props) => {
  const { eachItem } = props;
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
    packagePerAnnum,
  } = eachItem;

  return (
    <Link to={`/jobs/${id}`} className="link">
      <li className="card-container1">
        <div className="card-top-section">
          <div className="card-top-inner-section">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-icon"
            />
            <div>
              <h1 className="job-name">{title}</h1>
              <div className="rating-container">
                <FaStar className="star-icon" />
                <p className="rating-value">{rating}</p>
              </div>
            </div>
          </div>
          <div className="card-top-bottom-section">
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
            <p className="package">{packagePerAnnum}</p>
          </div>
        </div>
        <div className="card-bottom-section">
          <h1 className="job-name">Description</h1>
          <p className="job-desc">{jobDescription}</p>
        </div>
      </li>
    </Link>
  );
};

export default CardContainer;