import React, { useState } from 'react';
import {signInWithEmailAndPassword,createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../config/fire';
import './LoginBox.css';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';


function LoginBox() {
  const navigate = useNavigate();
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [signupData, setSignupData] = useState({ username: '', email: '', password: '' });
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleSignupClick = () => {
    setIsLoginActive(false);
  };
const handleLoginClick=()=>{
  setIsLoginActive(true);
};
  const login = () => {
    signInWithEmailAndPassword(auth,loginData.email, loginData.password)
      .then((userCredential) => {
        // Login successful
        const user = userCredential.user;
        console.log('Login successful:', user);
        navigate('/home');
        
      })
      .catch((error) => {
        // Login failed
        alert('Enter Proper Email and Password please!')
        setLoginData({  email: '', password: '' })
        console.log('Login failed:', error);
      });
  };

  const signup = () => {
    createUserWithEmailAndPassword(auth,signupData.email, signupData.password)
      .then((userCredential) => {
        // Signup successful
        const user = userCredential.user;
        console.log('Signup successful:', user);

        // After successful signup, switch to the login form
        setIsLoginActive(true);
        setSignupData({ username: '', email: '', password: '' });
      })
      .catch((error) => {
        // Signup failed
        console.log('Signup failed:', error);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isLoginActive) {
      // Perform login logic
      console.log('Login data:', loginData);
      login();

    } else {
      // Perform signup logic
      console.log('Signup data:', signupData);
      signup();
    }
  };

  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;

    if (formType === 'signup') {
      setSignupData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else if (formType === 'login') {
      setLoginData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  
  return (
    <div className='wrapper'>
      <div className={`form-box ${isLoginActive ? 'login' : 'register'}`}>
        <h2>{isLoginActive ? 'Login' : 'Signup'}</h2>
        <form onSubmit={handleFormSubmit}>
          {!isLoginActive && (
            <div className='input-box'>
              <span className='icon'>
                <SupervisedUserCircleIcon />
              </span>
              <input
                type='text'
                name='username'
                value={signupData.username}
                onChange={(e) => handleInputChange(e, 'signup')}
                required
              />
              <label>Username</label>
            </div>
          )}
          <div className='input-box'>
            <span className='icon'>
              <EmailIcon />
            </span>
            <input
              type='email'
              name='email'
              value={isLoginActive ? loginData.email : signupData.email}
              onChange={(e) => handleInputChange(e, isLoginActive ? 'login' : 'signup')}
              required
            />
            <label>Email</label>
          </div>
          <div className='input-box'>
            <span className='icon'>
              <LockIcon />
            </span>
            <input
              type='password'
              name='password'
              value={isLoginActive ? loginData.password : signupData.password}
              onChange={(e) => handleInputChange(e, isLoginActive ? 'login' : 'signup')}
              required
            />
            <label>Password</label>
          </div>
          <button type='submit' className='btn'>
            {isLoginActive ? 'Login' : 'Signup'}
          </button>
          <div className='login-register'>
            <p>
              {isLoginActive ? "Don't have an account?" : 'Already have an account?'}
              <button onClick={isLoginActive? handleSignupClick : handleLoginClick } className={isLoginActive ? 'register-link' : 'login-link'}>
                {isLoginActive ? 'Sign up' : 'Login'}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginBox;
