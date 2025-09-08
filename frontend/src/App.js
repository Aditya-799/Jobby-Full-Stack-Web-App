import Login from './components/Login'
import Signup from './components/Signup'
import Jobs from './components/Jobs'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Component } from 'react'
import NotFound from './components/NotFound'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
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

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                    <Route
      path="/jobs"
      element={
        <ProtectedRoute>
          <Jobs
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
          />
        </ProtectedRoute>
      }
    />
                    <Route exact path="/" element={<Signup />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        )
    }
}

export default App