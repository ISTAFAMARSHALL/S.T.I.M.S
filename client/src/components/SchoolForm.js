import React, { useState } from "react";
// import {useContext } from "react";
import { useHistory } from 'react-router-dom';
// import { UserContext } from "../context/user";

function SchoolForm() {

  // const {setCurrentUser} = useContext(UserContext);

  const history = useHistory()
  
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState([]);

  function handleLogin(e) {
    e.preventDefault();
    fetch("/schools", {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, address }),
    }).then((response) => {
    if (response.ok) {
    response.json().then((user) => {
    console.log(user)
    history.push("/")
    });
    } else {
    response.json().then((e) => setErrors(e.errors));
    }});
  }

  return (

    <form onSubmit={handleLogin}>

      <div > 
        <label>Name</label>
        <input
          type="text"
          id="email"
          required placeholder='Email is Case Sensitive'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label>Address</label>
        <input
          type="password"
          id="password"
          required placeholder='Password is Case Sensitive'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div>
        <button variant="fill" color="primary" type="submit">
          Login
        </button>
      </div>

      <div>
        { errors.length <= 0 ? ("") : (
        errors.map((err) => (
        <li key={err}>{err}</li>
        )))}
      </div>

    </form>

  );
}

export default SchoolForm;