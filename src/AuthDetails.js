import React,{useEffect,useState} from 'react';
import {auth} from './config/fire';
import {onAuthStateChanged} from 'firebase/auth';
// import { Redirect } from 'react-router-dom';
const  AuthDetails=()=> {
    const [userAuth,setUserAuth]=useState(null);
    useEffect (()=>{
        const listen =onAuthStateChanged(auth,(user)=>{
            if (user){
                setUserAuth(user);
            }
            else{
                setUserAuth(null);
            }
        });
        return ()=>{listen()};
       
    },[]);
    // if (userAuth) {
    //     // User is signed in, redirect to a new page
    //     return <Redirect to="http://localhost:3001/" />;
    //   }
  return (
    <div>
      {
        userAuth ? <p>{`signed in as ${userAuth.email}`} </p> : <p>Logged Out</p>
      }
    </div>
  )
}

export default AuthDetails;
