import React, { useState , useContext} from "react";
import { UserContext } from "../context/user";
import ClassDetails from "./ClassDetails";

function TeacherPage () {

    const {currentUser} = useContext(UserContext);
    const [selectedClass , setSelectedClass] = useState(false);
    const [viewClass , setViewClass] = useState(false);

    let displayClasses = currentUser.student_courses.map((course) => {

        return (           
            <div key={course.id}>
                <>
                Course Name: {currentUser.teachers[0].subject}
                <br></br>
                Time: {course.time}
                <br></br>
                <button onClick={()=>{
                    setSelectedClass(course)
                    setViewClass(true)
                    }} variant="fill" color="primary" >
                View Student List
                </button>
                <br></br>
                <br></br>
                </>
            </div> 
        )
    })

    return (

        <main>
        
            <h3>Hello {currentUser.teachers[0].name}</h3>
        
            <img src={currentUser.image} alt={currentUser.teachers[0].name}/>

            <ol>
                
                {currentUser.student_courses.length<=0 ? (        
                    <>
                    <h2>You have no classes</h2>
                    </>
                
                    ) : (
                    
                    <>
                    {!viewClass ?     
                    
                    (<>
                    
                    <div id="student_courses">
                    <h2>Your Classes</h2>
                        
                    {displayClasses}
                    </div>
                    </>) : (
                    
                    <ClassDetails selectedClass={selectedClass} setViewClass={setViewClass}/>
                    
                    )}

                    </>
                )}
                
            </ol> 

        </main>

    )
}

export default TeacherPage;

