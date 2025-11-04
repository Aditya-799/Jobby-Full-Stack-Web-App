
import {Plus, Search} from 'lucide-react';
import {useState} from 'react';
import './index.css';
import FormDialog from '../Modal';

const JobsPosted=(props)=> {
const {jobType, changeType} = props;
const [formOpen, setFormOpen] = useState(false);


const handleFormOpen = () => {
        setFormOpen(true);
};
const handleFormClose = () => {
    setFormOpen(false);
};


return (
    <div className="as-content">
        <>
            <h2 className="asc-heading">Recruiter Profile</h2>
            <p className="asc-description">Complete your recruiter profile to unlock Job posting feature</p>
            <div className="outer-container">
                <div className="card-container">
                <form className='rectruiter-form'>
                    <label className="label-find-jobs">Recruiter Name</label><br/>
                    <input type="text" placeholder="Enter Recruiter Name" className="input-find-jobs"/><br/>
                    <label className="label-find-jobs">Recruiter Name</label><br/>
                    <input type="text" placeholder="Enter Recruiter Email" className="input-find-jobs"/><br/>
                    <label className="label-find-jobs">Recruiter Phone</label><br/>
                    <input type="text" placeholder="Enter Recruiter Phone" className="input-find-jobs"/><br/>
                    <label className="label-find-jobs">Company Website Url</label><br/>
                    <input type="text" placeholder="Enter company website url" className="input-find-jobs"/><br/>
                    <label className="label-find-jobs">Company Logo Url</label><br/>
                    <input type="text" placeholder="Enter company logo url" className="input-find-jobs"/><br/>
                    <label className="label-find-jobs">Company Reviews</label><br/>
                    <input type="text" placeholder="Enter company Reviews" className="input-find-jobs"/><br/>
                    <label className="label-find-jobs">Company Number</label><br/>
                    <input tye="text" placeholder="Enter company Number" className="input-find-jobs"/><br/>
                    <label className="label-find-jobs">Company City Location</label><br/>
                    <input type="text" placeholder="Enter company City Location" className="input-find-jobs"/><br/>
                    <label className='label-find-jobs'>Company Address</label><br/>
                    <input type="text" placeholder="Enter company Address" className="input-find-jobs"/><br/>
                    <label className="label-find-jobs">Company LinkedIn Profile Url</label><br/>
                    <input type="text" placeholder="Enter company linked in profile url" className="input-find-jobs"/><br/>
                    <label className="label-find-jobs">Company Coorporate Email</label><br/>
                    <input type="text" placeholder="Enter company coorporate email address" className="input-find-jobs"/><br/>
                    <button type="submit" className="button-find-jobs">Update</button>
                </form>
            </div>
            </div>            
        </>
    </div>
);
}

export default JobsPosted;