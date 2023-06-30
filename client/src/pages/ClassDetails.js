import React from 'react'

function ClassDetails({selectedClass,setViewClass}) {

    let student_list = selectedClass.students.map((s) => (
        <div key={s.id}>
            <ul>
                <br></br>
                {s.name}
                <br></br>
                Birthday: {s.birthday}
                <br></br>
                Email: {s.email}
                <br></br>
                Address: {s.address}
                <br></br>
            </ul>
        </div>
    )) 

    return (
        <div >
            <div id='class_details'>
            <h1>{selectedClass.teacher.subject}</h1>
            <p>{selectedClass.time} Student List</p>
            </div>
            {student_list}
            <br></br>
            <div id='admin_buttons'>
            <button onClick={()=>setViewClass(false)} variant="fill" color="primary" >
                Return to Class List
            </button>
            </div>
        </div>
    )
}

export default ClassDetails