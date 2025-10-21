import {Plus, Search} from 'lucide-react';

const ApplicationsTab=(props)=> {
const {jobType, changeType} = props;
return (
    <div className="as-content">
                    <>
                        <h2 className="asc-heading">Applications</h2>
                        <p className="asc-description">Review and manage candidateapplications</p>
                        <div className="menu-jobpostings">
                            <div className="asc-search-container">
                                <Search className="search-icon" />
                                <input type="search" className="Search-bar-job-postings" placeholder='Search Applications...'/>
                            </div>
                            <select className="asc-dropdown asc-search-container" onChange={changeType} value={jobType}>
                                <option className="asc-option">All Types</option>
                                <option className="asc-option">Jobs</option>
                                <option className="asc-option">Internships</option>
                            </select>
                        </div>
                        <div className="Job-postings">
                            <table className="jp-table">
                                <tbody>
                                <tr className="table-line">
                                    <th className="table-heading title">Applicant</th>
                                    <th className="table-heading">Job Title</th>
                                    <th className="table-heading">Status</th>
                                    <th className="table-heading">Match Score</th>
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
)
}

export default ApplicationsTab