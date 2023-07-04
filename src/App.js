import React from 'react';
// import TeamProfile from './TeamProfile/TeamProfile'
// import AuthDetails from './AuthDetails';
// import Header from './Headerfile/Header';
// import LoginBox from './LoginBoxfile/LoginBox';
import Sudokusolve from './Sudoku/Sudokusolve';
import LoginMain from './LoginMain';
import './App.css';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";


function App(){
  const router = createHashRouter([
    {
      path: "/",
      element: <LoginMain/>,
    },
    // {
    //   path: "/team",
    //   element: <TeamProfile/>,
    // },
    {
      path:"/home",
      element:<Sudokusolve/>,
    }
  ]);
  return (
    <div class='App'>
     {/* <Header />
      <LoginBox />
    <AuthDetails /> */}
{/* <LoginMain/> */}
<RouterProvider router={router} />
    </div>
  )

}
export default App;

