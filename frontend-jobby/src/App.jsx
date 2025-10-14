//import Login from './components/Login/index.jsx'
import Signup from './components/Signup'
import Login from './components/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
/*import Jobs from './components/Jobs/index.jsx'
import Home from './components/Home/index.jsx'
import ProtectedRoute from './components/ProtectedRoute/index.jsx'
import JobItemDetails from './components/JobItemDetails/index.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Component } from 'react'
import NotFound from './components/NotFound/index.jsx'*/

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

/*class App extends Component {
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
                    <Route exact path="/jobs/:id" element={<ProtectedRoute><JobItemDetails/></ProtectedRoute>}/>
                    <Route exact path="/" element={<Signup />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        )
    }
}*/

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App