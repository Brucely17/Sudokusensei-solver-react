import React from 'react'
import AuthDetails from './AuthDetails';
import HouseIcon from '@mui/icons-material/House';
import { useNavigate } from 'react-router-dom';
import LoginBox from './LoginBoxfile/LoginBox';
import './LoginMain.css'
function LoginMain() {
  const navigate=useNavigate();
    const home =()=>{
  navigate("/home");
    }
  return (
    <div className="loginmain">
     <header class='Header'>
    
    {/* <HouseIcon  /> */}
    <button class='Header__button' onClick={home}>Home</button>
   
    </header>
    
       
      <LoginBox />
    {/* <AuthDetails /> */}
    </div>
  )
}

export default LoginMain;
