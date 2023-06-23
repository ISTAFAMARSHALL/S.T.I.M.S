import React from 'react'
import { useContext } from 'react';
import {NavLink} from 'react-router-dom'
import { UserContext } from "../context/user";
// import LogoutButton from "../components/LogoutButton";

function Navbar({setLoggedIn}) {

  const { currentUser, setCurrentUser} = useContext(UserContext)

  function handleLogOut() {
    fetch("/logout", { method: "DELETE" })
    setCurrentUser(null);
    setLoggedIn(false);
  }

  return (
    <div id='navbar'>

      <NavLink className="button"
        exact 
        to="/">
        <button>Home</button>
      </NavLink>
        
      <NavLink className="button"
        exact 
        to="/my_info">
        <button>My Info</button>
      </NavLink>

      {currentUser.auth_level === "admin" && currentUser.schools.length === 0 ? (<NavLink           
        className="button"
        exact
        to="/schools">
        <button> Schools</button>
      </NavLink>) : ("")}

      <NavLink className="button"
        exact
        to="/teachers"
        ><button> {currentUser.auth_level === "admin"  && currentUser.schools.length === 0 ? ("School District Staff") : ("School Staff")} </button>
      </NavLink>
      
      <NavLink className="button"
        exact
        to="/students"><button> {currentUser.auth_level === "admin" && currentUser.schools.length === 0 ? ("School District Students") : ("School Students")}</button>
      </NavLink>

      <NavLink className="button"
        exact
        to="/logout"
        ><button onClick={() => {
        setLoggedIn(false)  
        handleLogOut()}}>Logout</button>
        {/* <LogoutButton/> */}
      </NavLink>

    </div>    
  )
}

export default Navbar