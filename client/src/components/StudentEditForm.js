import React, { useState } from "react";

function StudentEditForm({setEditStudent,editStudent, updateStudent}) {

  const [name, setStudentsName] = useState(updateStudent.name);
  const [address, setAddress] = useState(updateStudent.address);
  const [email, setEmail] = useState(updateStudent.email);
  const [birthday, setBirthday] = useState(updateStudent.birthday)

  const [errors, setErrors] = useState([])
  
  const updatedStudent ={
    name,
    address,
    email,
    birthday
  }
    
  function handleEditStudent(e) {
    e.preventDefault();
    fetch(`students/${updateStudent.id}`, {
    method: "PATCH",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedStudent)
    }).then((response) => {
    if (response.ok) {
    response.json().then((data) => {
    setEditStudent(!editStudent)
    });
    } else {
    response.json().then((e) => setErrors(e.errors));
    }});
  }

  function handleDelete() {
    fetch(`students/${updateStudent.id}`, { method: "DELETE" })
    .then((r) => r.json())
    .then((data) => setEditStudent(!editStudent))    
  }

  return (

    <form  onSubmit={handleEditStudent}>

      <div>
        <label>Students Name </label>
          <input 
            type="text"
            value={name}
            placeholder='Please Enter Restaurant Name'
            onChange={(e) => setStudentsName(e.target.value)}
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
          <select value={authLevel} required placeholder='Select Reservation Day' onChange={(e) => setAuthLevel(e.target.value)}>
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
      
      <button type="submit" value="Save">Update Student</button>

      <button onClick={()=>setEditStudent(!editStudent)} variant="fill" color="primary" >
          Cancel Edit
      </button>

      <button onClick={handleDelete} variant="fill" color="primary" >
          Delete Student
      </button>

    </form>
  )
}

export default StudentEditForm;