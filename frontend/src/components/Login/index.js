import { Component } from "react";
import axios from "axios";
import { ToastContainer,toast,Bounce } from "react-toastify";
import {Navigate} from "react-router-dom";
import Cookies from "js-cookie";
import  withRouter  from './withRouter';
import './index.css';


class Login extends Component {
    state={email:'',password:'',role:'recruiter'}
     changedUsername = event => {
    this.setState({email: event.target.value})
  }

  changedPassword = event => {
    this.setState({password: event.target.value})
  }
  changeToHome = data => {
    const { navigate } = this.props
    Cookies.set('jwtToken', data, {expires: 30})
    navigate('/home', { replace: true })
  }

  changedType = event => {
    this.setState({role: event.target.value})
    }
    handleSubmit= async (e)=>{
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
    render(){
    const {email, password,role} = this.state
    console.log(email,password,role)
    const cookieval=Cookies.get('jwtToken')
    if(cookieval!==undefined){
        return <Navigate to='/home' replace/>
    }
        return(
            <div className="bg-container">
        <div className="card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-icon"
          />
          <form className="form-container" onSubmit={this.handleSubmit}>
            <label htmlFor="Email" className="username-heading">
                Email
            </label>
            <input
              type="email"
              className="username"
              id="Email"
              placeholder="Email"
              onChange={this.changedUsername}
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
              onChange={this.changedPassword}
              value={password}
            />
             <label htmlFor="typeOfLogin" className="username-heading">LogIn as</label>
            <select id="typeOfLogin" className="username" onChange={this.changedType} value={role}>
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
}

    export default withRouter(Login);