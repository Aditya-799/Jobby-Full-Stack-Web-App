import { Component } from "react";
import { ToastContainer,toast,Bounce } from "react-toastify";
import { Link,Navigate} from "react-router-dom";
import Cookies from 'js-cookie'
import axios from "axios";
import './index.css';

class Signup extends Component {
    state={email:'',password:'',role:'recruiter',username:''}
     changedUsername = event => {
    this.setState({username: event.target.value})
  }

  changedPassword = event => {
    this.setState({password: event.target.value})
  }

  changedType = event => {
    this.setState({role: event.target.value})
    }
    changedEmail=event=>{
        this.setState({email:event.target.value})
    }

    handleSubmit= async (e)=>{
        e.preventDefault()
        const {email,password,role,username}=this.state
        try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/auth/signup`, {
            fullName:username,
            email,
            password,
            role
        });
        if (response.status === 201 || response.status===200) {
            toast.success('Signup successful');
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
    render(){

        const {email,password,role,username}=this.state
        const cookieval=Cookies.get('jwtToken')
        if(cookieval!==undefined){
            <Navigate to='/home' replace/>
        }
        console.log(role,password,email,username)
        return(
             <div className="bg-container">
        <div className="card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-icon"
          />
          <form className="form-container" onSubmit={this.handleSubmit}>
            <label htmlFor="signupusername" className="username-heading">
                USERNAME
            </label>
            <input
              type="text"
              className="username"
              id="signupusername"
              placeholder="Username"
              onChange={this.changedUsername}
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
              onChange={this.changedEmail}
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
              onChange={this.changedPassword}
              value={password}
            />
             <label htmlFor="signuptypeOfLogin" className="username-heading">LogIn as</label>
            <select id="signuptypeOfLogin" className="username" onChange={this.changedType} value={role}>
              <option className="important" value="recruiter">recruiter</option>
              <option className="important" value="user">user</option>
            </select>
            <button type="submit" className="login-button">
              Sign up
            </button>
          </form>
          
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
          <p className="signup-link">Already have an account?
          <Link to="/login" className="link">
             Login
          </Link>
          </p>
        </div>
      </div>
            
        )
    }
}

    export default Signup;