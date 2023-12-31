import React, { useState, useContext} from "react";
import { UserContext } from "../context/user";
import StudentEditForm from "../components/StudentEditForm.js";

function StudentList ({students , setStudents }) {

  const {currentUser} = useContext(UserContext);
  const [editStudent, setEditStudent] = useState(false);
  const [updateStudent, setUpdateStudent] = useState([]);

  // const filtered_school = currentUser.auth_level === "admin" && currentUser.schools.length === 0 ?  ("") : (currentUser.auth_level !== "teacher" && currentUser.auth_level !== "admin" ?  (currentUser.students[0].school.id) : (currentUser.schools[0].id))
      
  // useEffect(() => {
  //   fetch(`all_students/${filtered_school}`)
  //   .then((response) => {
  //   if (response.ok) {
  //   response.json().then((data) => {
  //   setSchool(data);
  //   });
  //   } else {
  //   response.json().then((e) => setErrors(e.errors));
  //   }});
  // }, [setEditStudent]);

  function handleStudentEdit(e) {
    setUpdateStudent(e)
  }


  return editStudent === true ? (
    
    <div>
      <br></br>
      <StudentEditForm editStudent={editStudent} setEditStudent={setEditStudent} updateStudent={updateStudent} 
      students={students}
      setStudents={setStudents}
      />
    </div>
    
    ) : (
        
    <main>
        
      <h1>All of {students !== undefined ? (students.map((s) => s.school.name)[0]) : ("")} Students</h1>
      
      {students.length !== undefined ? (students.map((s) => (
            
        <ul key={s.id} className="student">
        
        <img src={s.user.image} alt={s.name}/>
        <br></br>
        {s.name}
        <br></br>
        {s.email}
        <br></br>
        {currentUser.auth_level === "admin" ? (
        <button onClick={(e)=>{
        setEditStudent(!editStudent)
        handleStudentEdit(s)
        }} variant="fill" color="primary" >
        Update Student Info
        </button>) : ("")}
          </ul>
      ))) : ("") }

    </main>

  )
}

export default StudentList;

