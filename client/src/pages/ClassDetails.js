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
            <h1>{selectedClass.teacher.subject}</h1>
            <header>{selectedClass.time} Student List</header>
            <br></br>
            {student_list}
            <br></br>
            <button onClick={()=>setViewClass(false)} variant="fill" color="primary" >
                Return to Class List
            </button>
        </div>
    )
}

export default ClassDetails