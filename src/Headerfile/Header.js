import React from 'react';
import './Header.css';
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import { useNavigate } from 'react-router-dom';
function Header() {
    // use this home when u need to add home nav bar
    // function Home(){
    //     return (<div></div>)
    // }
    const navigate=useNavigate();
    const login =()=>{
  navigate("/");
    }
  return (
   
    <header class='header'>
    {/* <img src='Sudoku-logo.png' ></img> */}
    {/* <img src='https://see.fontimg.com/api/renderfont4/w12j8/eyJyIjoiZnMiLCJoIjo4MSwidyI6MTI1MCwiZnMiOjY1LCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/U3Vkb2t1IFNlbnNlaQ/assassin-ninja.png'></img> */}
    
        <h2 class='header__logo'>Sudoku <ExtensionOutlinedIcon className='logo-icon'/> Sensei</h2>
        <nav class='header__nav'>
        {/* <a href='/home'>Home</a> */}
        <a href='/team'>Team</a>
        <a href='/community'>Community</a>
        <a href='/services'>Services</a>
        {/* <p onClick={Home}>Home </p> */}

        
        <button class='header__button' onClick={login}>Login</button>

        </nav>
    </header>
    
  )
}

export default Header;
