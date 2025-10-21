
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
                        <h2 className="asc-heading">Job Postings</h2>
                        <p className="asc-description">Manage your job postings and view applications</p>
                        <div className="menu-jobpostings">
                            <div className="asc-search-container">
                                <Search className="search-icon" />
                                <input type="search" className="Search-bar-job-postings" placeholder='Search Postings...'/>
                            </div>
                            <select className="asc-dropdown asc-search-container" onChange={changeType} value={jobType}>
                                <option className="asc-option">All Types</option>
                                <option className="asc-option">Jobs</option>
                                <option className="asc-option">Internships</option>
                            </select>
                            <button type="button" className="asc-addJobsbutton" onClick={handleFormOpen}><Plus size={20} className="asc-plus-icon"/>Add New Posting</button>
                            {formOpen && (
                        <FormDialog 
                            open={formOpen}
                            handleClose={handleFormClose}
                        />
                    )}
                        </div>
                        <div className="Job-postings">
                            <table className="jp-table">
                                <tbody>
                                <tr className="table-line">
                                    <th className="table-heading title">Title</th>
                                    <th className="table-heading">Type</th>
                                    <th className="table-heading">Posted By</th>
                                    <th className="table-heading">Date</th>
                                    <th className="table-heading">Applications</th>
                                    <th className="table-heading">Actions</th>
                                </tr>

                                <tr className="table-line">
                                    <td className="table-heading title">
                                        <div className="role-container">
                                            <p className="role">Senoier Developer</p>
                                            <p className="asc-description">Remote</p>
                                        </div></td>
                                    <td className="table-heading data">Type</td>
                                    <td className="table-heading data">Tech Tantra</td>
                                    <td className="table-heading data">Date</td>
                                    <td className="table-heading data">Applications</td>
                                    <td className="table-heading data">Actions</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        </>
                    </div>
);
}

export default JobsPosted;