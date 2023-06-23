import React from 'react'
import { useState , useContext} from "react";
import { UserContext } from "../context/user";
import TeacherForm from "../components/TeacherForm";
import StudentForm from "../components/StudentForm";

function AdminPage () {

    const {currentUser } = useContext(UserContext);

    const [addTeacher , setAddTeacher] = useState(false)
    const [addStudent , setAddStudent] = useState(false)
    const [disabled, setDisabled] = useState(false)

    return (

        <main>
            
            <h3>Hello Administrator {currentUser.teachers[0].name}</h3>

            <img src={currentUser.image} alt={currentUser.teachers[0].name}/>

            <ol>

                {currentUser.teachers[0].school.length<=0 ? (        
                <>
                <h2>You are not assigned a School</h2>

                <button  variant="fill" color="primary" >
                Add School
                </button>

                </>
                
                ) : (
                    
                <>
                
                <h2>Your School is {currentUser.teachers[0].school.name} </h2>
                
                </>

                )}
                
                <button disabled={disabled} onClick={()=>{
                    setAddTeacher(!addTeacher)
                    setDisabled(!disabled)
                }} variant="fill" color="primary" >
                Add Teacher
                </button>

                <button disabled={disabled} onClick={()=>{
                    setAddStudent(!addStudent)
                    setDisabled(!disabled)
                }} variant="fill" color="primary" >
                    Add Student
                </button>

                {addTeacher ? ( <TeacherForm setDisabled={setDisabled} setAddTeacher={setAddTeacher} addTeacher={addTeacher} /> ) : ("") }

                {addStudent ? ( <StudentForm setDisabled={setDisabled} setAddStudent={setAddStudent} addStudent={addStudent} /> ) : ("") }
                        
            </ol> 

        </main>

    )
}

export default AdminPage;