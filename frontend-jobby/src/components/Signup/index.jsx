import { ToastContainer,toast,Bounce } from "react-toastify";
import { Link,Navigate,useNavigate} from "react-router-dom";
import { useState } from "react";
import Cookies from 'js-cookie'
import axios from "axios";
import './index.css';

const Signup = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [role,setRole] = useState('recruiter')
    const [username,setUsername] = useState('')
    const navigate=useNavigate()
    const changedUsername = event => {
    setUsername(event.target.value)
  }

  const changedPassword = event => {
    setPassword(event.target.value)
  }

  const changedType = event => {
    setRole(event.target.value)
    }
  const changedEmail=event=>{
        setEmail(event.target.value)
    }

  const handleSubmit= async (e)=>{
        e.preventDefault()
        try {
        const response = await axios.post(`http://localhost:8000/api/auth/signup`, {
            fullName:username,
            email,
            password,
            role
        });
        if (response.status === 201 || response.status===200) {
            toast.success('Signup successful');
            navigate('/login',{replace:true})
            localStorage.setItem('userName',JSON.stringify(username));
            localStorage.setItem('email',JSON.stringify(email))
        } else {
          toast.error('Signup failed');
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

       /* const cookieval=Cookies.get('jwtToken')
        if(cookieval!==undefined){
            <Navigate to='/home' replace/>
        }
        console.log(role,password,email,username)*/
        return(
             <div className="bg-container">
        <div className="card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-icon"
          />
          <form className="form-container" onSubmit={handleSubmit}>
            <label htmlFor="signupusername" className="username-heading">
                USERNAME
            </label>
            <input
              type="text"
              className="username"
              id="signupusername"
              placeholder="Username"
              onChange={changedUsername}
              value={username}
            />
            <label htmlFor="signupemail" className="username-heading">
                EMAIL
            </label>
            <input
              type="email"
              className="username"
              id="signupemail"
              placeholder="Enter email"
              onChange={changedEmail}
              value={email}
            />
            <label htmlFor="signupPassword" className="username-heading">
              PASSWORD
            </label>
            <input
              type="password"
              className="username"
              id="signupPassword"
              placeholder="Password"
              onChange={changedPassword}
              value={password}
            />
             <label htmlFor="signuptypeOfLogin" className="username-heading">LogIn as</label>
            <select id="signuptypeOfLogin" className="username" onChange={changedType} value={role}>
              <option className="important styling" value="recruiter">recruiter</option>
              <option className="important styling" value="user">user</option>
            </select>
            <button type="submit" className="login-button" >
              Sign up
            </button>
          </form>
          
          
          <p className="signup-link">Already have an account?
          <Link to="/login" className="link">
             Login
          </Link>
          </p>
        </div>
      </div>
            
        )
    }

    export default Signup;



   /* <Link to="/login" className="link">
             Login
          </Link>*/