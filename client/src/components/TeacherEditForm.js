import React, { useState } from "react";
// import { UserContext } from "../context/user";



function TeacherEditForm({setEditTeacher,editTeacher, updateTeacher}) {

  const [name, setTeachersName] = useState(updateTeacher.name);
  const [address, setAddress] = useState(updateTeacher.address);
  // const [subject, setSubject] = useState("");
  const [email, setEmail] = useState(updateTeacher.email);
  const [birthday, setBirthday] = useState(updateTeacher.birthday)

  // const [password, setPassword] = useState("")
  // const [password_confirmation, setPasswordConfirmation] = useState("")

  const [errors, setErrors] = useState([])
  // const {currentUser} = useContext(UserContext);

  const updatedTeacher ={
    name,
    address,
    email,
    birthday
  }
    
  function handleEditTeacher(e) {
    e.preventDefault();
        
    fetch(`teachers/${updateTeacher.id}`, {
    method: "PATCH",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTeacher)
    }).then((response) => {
    if (response.ok) {
    response.json().then((data) => {
    setEditTeacher(!editTeacher)
    });
    } else {
      response.json().then((e) => setErrors(e.errors));
    }});
  }

  function handleDelete() {
    fetch(`teachers/${updateTeacher.id}`, { method: "DELETE" })
    .then((r) => r.json())
    .then(() => setEditTeacher(!editTeacher))
  }

  return (

    <form  onSubmit={handleEditTeacher}>

      <div>
        <label>Teachers Name </label>
          <input 
            type="text"
            value={name}
            placeholder='Please Enter Restaurant Name'
            onChange={(e) => setTeachersName(e.target.value)}
          />
      </div>

      <div>
        <label>Address </label>
          <input 
            type="text"
            value={address}
            placeholder='Please Enter Cuisine Type'
            onChange={(e) => setAddress(e.target.value)}
          />
      </div>

      {/* <div>
        <label>Subject </label>
          <input 
            type="text"
            value={subject}
            placeholder='Please Enter a Description'
            onChange={(e) => setSubject(e.target.value)}
          />
      </div> */}

      <div>
        <label>Email </label>
          <input 
            type="text"
            value={email}
            placeholder='Please Enter a Description'
            onChange={(e) => setEmail(e.target.value)}
          />
      </div>

      <div>
        <label>Birthday </label>
          <input 
            type="text"
            value={birthday}
            placeholder='Please Enter a Description'
            onChange={(e) => setBirthday(e.target.value)}
          />
      </div>

      {/* <div>
        <label>Choose Level </label>
          <select value={authLevel} required placeholder='Select Reservation Day' onChange={(e) =>      
          setAuthLevel(e.target.value)}>
            <option value=""></option>
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
          </select>
      </div>

      <div>
        <label>Password </label>
          <input 
          type="text"
          value={password}
          placeholder='Please Enter a Description'
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <label>Password Confirmation </label>
          <input 
          type="text"
          value={password_confirmation}
          placeholder='Please Enter a Description'
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </div> */}

      <div>
        { errors.length <= 0 ? ("") : (
          errors.map((err) => (
          <li key={err}>{err}</li>
        )))}
      </div>

      <br></br>
      
      <button type="submit" value="Save">Update Teacher</button>

      <button onClick={()=>setEditTeacher(!editTeacher)} variant="fill" color="primary" >
        Cancel Edit
      </button>

      <button onClick={handleDelete} variant="fill" color="primary" >
        Delete Teacher
      </button>

    </form>
  )
}

export default TeacherEditForm