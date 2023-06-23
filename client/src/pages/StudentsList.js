import React, { useEffect , useState, useContext} from "react";
import { UserContext } from "../context/user";
import StudentEditForm from "../components/StudentEditForm.js";

function StudentList () {

  const {currentUser} = useContext(UserContext);
  const [school, setSchool] = useState([]);
  const [errors, setErrors] = useState([]);
  const [editStudent, setEditStudent] = useState(false);
  const [updateStudent, setUpdateStudent] = useState([]);

  const filtered_school = currentUser.auth_level === "admin" && currentUser.schools.length === 0 ?  ("") : (currentUser.auth_level !== "teacher" && currentUser.auth_level !== "admin" ?  (currentUser.students[0].school.id) : (currentUser.schools[0].id))
      
  useEffect(() => {
    fetch(`schools/${filtered_school}`)
    .then((response) => {
    if (response.ok) {
    response.json().then((data) => {
    setSchool(data);
    });
    } else {
    response.json().then((e) => setErrors(e.errors));
    }});
  }, [editStudent, filtered_school]);

  function handleStudentEdit(e) {
    setUpdateStudent(e)
  }

  return editStudent === true ? (
    
    <div>
      <br></br>
      <StudentEditForm editStudent={editStudent} setEditStudent={setEditStudent} updateStudent={updateStudent} />
    </div>
    
    ) : (
        
    <div>
        
      <h1>All of {school.name} Students</h1>



      {school.length === undefined ? (school.students.map((s) => (
            
        <ul key={s.id}>
        
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

      <div>
        { errors.length <= 0 ? ("") : (
          errors.map((err) => (
        <li key={err}>{err}</li>
        )))}
      </div>

    </div>

  )
}

export default StudentList;

