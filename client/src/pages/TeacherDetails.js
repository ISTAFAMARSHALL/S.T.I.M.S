import React from 'react'

function TeacherDetails({selectedTeacher,setViewTeacher}) {

    let teacher_list = selectedTeacher.teacher.map((t) => (
        <div key={t.id}>
            <ul>
                <h1>{t.subject}</h1>
                {t.name}
                <br></br>
                Birthday: {t.birthday}
                <br></br>
                Email: {t.email}
                <br></br>
            </ul>
        </div>
    )) 

  return (
        <div>
            <br></br>
            {teacher_list}
            <br></br>
            <button onClick={()=>setViewTeacher(false)} variant="fill" color="primary" >
            Return to Class List
            </button>
        </div>
    )
}

export default TeacherDetails