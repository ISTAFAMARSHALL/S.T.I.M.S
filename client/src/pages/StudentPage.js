import React, {useState , useContext} from "react";
import { UserContext } from "../context/user";
import TeacherDetails from "./TeacherDetails";

function StudentPage () {

    const {currentUser} = useContext(UserContext);
    const [selectedTeacher , setSelectedTeacher] = useState(false);
    const [viewTeacher , setViewTeacher] = useState(false);

    let displayTeachers = currentUser.course_enrollments.map((course) => {
        return (        
            <div key={course.id}>
                <div>
                Course: {course.teacher[0].subject}
                <br></br>
                Teacher: {course.teacher[0].name}
                <br></br>
                <button onClick={()=>{
                setSelectedTeacher(course)
                setViewTeacher(true)
                }} variant="fill" color="primary" >
                View Teacher Details
                </button>
                <br></br>
                <br></br>
            </div>
        </div> 
    )})

    return (
        
        <main>
    
        <h2> Hello Student {currentUser.students[0].name}</h2> 
        
        <img src={currentUser.image} alt={currentUser.students[0].name}/>

        <ul>
        
        {currentUser.course_enrollments.length<=0 ? (
            
            <>
                <h2>You have no classes</h2>
            </>
            
            ) : (
                
            <>
            {!viewTeacher ?   
            (
            <>

            <h2>Your Classes</h2>
            
            {displayTeachers}
            </>

            ):(
            
            <TeacherDetails selectedTeacher={selectedTeacher} setViewTeacher={setViewTeacher} />
            )}

            </>

        )}

        </ul> 

        </main>

    )
}

export default StudentPage;

