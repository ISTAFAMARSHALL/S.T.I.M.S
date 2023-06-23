import React, { useEffect , useState, useContext} from "react";
import { UserContext } from "../context/user";
import TeacherEditForm from "../components/TeacherEditForm";

function TeacherList () {

  const {currentUser} = useContext(UserContext);
  const [school, setSchool] = useState([]);
  const [errors, setErrors] = useState([]);
  const [editTeacher, setEditTeacher] = useState(false);
  const [updateTeacher, setUpdateTeacher] = useState([]);

  let filtered_school = currentUser.auth_level === "admin" && currentUser.schools.length === 0 ?  ("") : (currentUser.auth_level !== "teacher" && currentUser.auth_level !== "admin" ?  (currentUser.students[0].school.id) : (currentUser.schools[0].id))

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
  }, [editTeacher, filtered_school]);

  function handleTeacherEdit(e) {
    setUpdateTeacher(e)
  }

  return editTeacher === true ? (
        
    <div>

      <br></br>

      <TeacherEditForm editTeacher={editTeacher} 
      setEditTeacher={setEditTeacher} 
      updateTeacher={updateTeacher} />

    </div>

    ) : (

    <div>
      
      <h1>All of {school.name} Teachers</h1>

      {school.length === undefined ? (school.teachers.map((t) => (

      <ul key={t.id}>

        <img src={t.user.image} alt={t.name}/>
        <br></br>
        {t.name}
        <br></br>
        {t.subject}
        <br></br>
        {t.email}
        <br></br>

        {currentUser.auth_level === "admin" ? (
        
        <button onClick={(e)=>{
        setEditTeacher(!editTeacher)
        handleTeacherEdit(t)
        }}
        variant="fill" color="primary" >
        Update Teacher Info
        </button>
        ) : ("")}

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

export default TeacherList;

