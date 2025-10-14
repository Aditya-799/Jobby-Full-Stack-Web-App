import axios from "axios";
import { ToastContainer,toast,Bounce } from "react-toastify";
import {useState} from 'react'
import Cookies from "js-cookie";
import './index.css';


const Login=()=>{
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [role,setrole]=useState('recruiter')
    const changedUsername = event => {
    setEmail(event.target.value)
  }

  const changedPassword = event => {
      setPassword(event.target.value)
  }
 const changeToHome = data => {
    const { navigate } = this.props
    Cookies.set('jwtToken', data, {expires: 30})
    navigate('/home', { replace: true })
  }

  const changedType = event => {
      setrole(event.target.value)
    }
    const handleSubmit= async (e)=>{
        e.preventDefault()
        const {email,password,role}=this.state
        try {
        const response = await axios.post(`http://localhost:8000/api/auth/login`, {
            email,
            password,
            role,
        });

        if (response.status === 200 || response.status === 201) {
            const { token } = response.data;
            this.changeToHome(token)
            toast.success('Login successful');
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
    /*
    const cookieval=Cookies.get('jwtToken')
    if(cookieval!==undefined){
        return <Navigate to='/home' replace/>
    }*/
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
              onChange={changedUsername}
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
              <option className="important" value="recruiter">recruiter</option>
              <option className="important" value="user">user</option>
            </select>
            <button type="submit" className="login-button">
              Login
            </button>
            
          </form>
        </div>
        <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
      </div>
        )
    }

    export default Login;