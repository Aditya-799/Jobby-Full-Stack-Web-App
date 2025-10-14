import React from 'react';

const JobsContext = React.createContext({
  jobsAppliedList: [],
  applyForJob:()=>{}
});

export default JobsContext