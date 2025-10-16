import axios from "axios";
import {Navigate,useNavigate,Link} from 'react-router-dom'
import {ToastContainer,toast,Bounce} from "react-toastify";
import {useState} from 'react'
import Cookies from "js-cookie";
import './index.css';


const Login=()=>{
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [role,setrole]=useState('recruiter')
    const navigate=useNavigate()

    const jwtToken = Cookies.get('jwtToken')
    if (jwtToken !== undefined) {
      return <Navigate to="/home" replace/>
    }

    const changedEmail = event => {
    setEmail(event.target.value)
  }

  const changedPassword = event => {
      setPassword(event.target.value)
  }
 const changeToHome = data => {
    Cookies.set('jwtToken', data, {expires: 30})
    navigate('/home',{replace:true})
  }

  const changedType = event => {
      setrole(event.target.value)
    }
    const handleSubmit= async (e)=>{
        e.preventDefault()
        try {
        const response = await axios.post(`http://localhost:8000/api/auth/login`, {
            email,
            password,
            role,
        });

        if (response.status === 200 || response.status === 201) {
          toast.success('Login successful')
            const { token } = response.data;
            changeToHome(token)
        } else {
            toast.error('Login failed');
        }
    } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
        console.error('Error:', error.response.data.message);
        toast.error(error.response.data.message);
        
    } else {
        console.error('Error:', error.message || error);
        toast.error('An unexpected error occurred.');
    }
}
        
    }
    
   
        return(
            <div className="bg-container">
        <div className="card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-icon"
          />
          <form className="form-container" onSubmit={handleSubmit}>
            <label htmlFor="Email" className="username-heading">
                Email
            </label>
            <input
              type="email"
              className="username"
              id="Email"
              placeholder="Email"
              onChange={changedEmail}
              value={email}
            />
            <label htmlFor="Password" className="username-heading">
              PASSWORD
            </label>
            <input
              type="password"
              className="username"
              id="Password"
              placeholder="Password"
              onChange={changedPassword}
              value={password}
            />
             <label htmlFor="typeOfLogin" className="username-heading">LogIn as</label>
            <select id="typeOfLogin" className="username" onChange={changedType} value={role}>
              <option className="important styling" value="recruiter">recruiter</option>
              <option className="important styling" value="user">user</option>
            </select>
            <button type="submit" className="login-button">
              Login
            </button>
            
          </form>
          <p className="signup-link">Already have an account?
          <Link to="/signup" className="link">
             Sign up
          </Link>
          </p>
        </div>
        
      </div>
        )
    }

    export default Login;