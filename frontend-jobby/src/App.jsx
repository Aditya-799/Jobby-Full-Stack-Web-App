import Signup from './components/Signup'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import { ToastContainer,toast,Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Routes, Route } from 'react-router-dom'
import JobItemDetails from './components/JobItemDetails'
import ProfileSection from './components/ProfileSection'
import NotFound from './components/NotFound'
import Home from './components/Home'
import AppliedJobsSection from './components/AppliedJobsSection'
/*import ProfileSection from './components/ProfileSection'*/
import Jobs from './components/Jobs'
import './App.css'
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'Full-time',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'Part-time',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'Freelance',
  },
  {
    label: 'Internship',
    employmentTypeId: 'Internship',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]


const App = () => {
  return (
    <>
    <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="light"
          transition={Bounce}
          />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/jobs' element={<Jobs employmentTypesList={employmentTypesList} salaryRangesList={salaryRangesList} />} />
            <Route path='/jobs/:id' element={<JobItemDetails/>} />
            <Route path='/profile/section' element={<ProfileSection/>} />
            <Route path='/jobs/applied' element={<AppliedJobsSection/>} />
        <Route/>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </>
  )
}
  /*
 const App=()=>{
  return (
    <ProfileContainer/>
  )
 }*/
export default App