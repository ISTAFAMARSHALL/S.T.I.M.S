import React, {  useState, useContext} from "react";
import { UserContext } from "../context/user";
import TeacherEditForm from "../components/TeacherEditForm";

function TeacherList ({staff , setStaff}) {

  const {currentUser} = useContext(UserContext);

  const [editTeacher, setEditTeacher] = useState(false);
  const [updateTeacher, setUpdateTeacher] = useState([]);

  function handleTeacherEdit(e) {
    setUpdateTeacher(e)
  }

 
  return editTeacher === true ? (
        
    <div >

      <br></br>

      <TeacherEditForm editTeacher={editTeacher} 
      setEditTeacher={setEditTeacher} 
      updateTeacher={updateTeacher} 
      staff={staff}
      setStaff={setStaff}
      />

    </div>

    ) : (

    <main >
      
      {/* <h1>All of {staff[0].school.name} Teachers</h1> */}
      
      <div className="teachers" >
      {staff !== undefined ? (staff.map((t) => (

      <div key={t.id} className="teacher">

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

      </div>
      
      ))) : ("") }</div>

    </main>
    
  )
}

export default TeacherList;

