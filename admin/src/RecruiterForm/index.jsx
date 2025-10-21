
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
            <div className="menu-jobpostings">
                <form className='rectruiter-form'>
                </form>
            </div>
                        
        </>
    </div>
);
}

export default JobsPosted;