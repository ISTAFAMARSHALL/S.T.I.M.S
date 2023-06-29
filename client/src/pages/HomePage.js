import { useEffect , useState, useContext} from "react";
import React from 'react';
import { Route, Switch} from "react-router-dom"
import NavBar from "../components/NavBar"
import TeacherPage from "../pages/TeacherPage"
import { UserContext } from "../context/user";
import StudentPage from "./StudentPage";
import TeacherList from "./TeacherList";
import StudentList from "./StudentsList";
import SchoolList from "./SchoolList";
import MyInfoPage from "./MyInfoPage";
import AdminPage from "./AdminPage";

function HomePage({setLoggedIn}) {

  const {currentUser, setCurrentUser} = useContext(UserContext);
  const [staff, setStaff] = useState([]);
  const [students, setStudents] = useState([]);
  const [staffButton, setStaffButton] = useState(true);
  const [studentButton, setStudentButton] = useState(true);

  useEffect(() => {
    fetch("/me")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }})
    .then((user) => {
      setCurrentUser(user);

      let filtered_school = currentUser.auth_level === "admin" && currentUser.schools.length === 0 ?  ("") : (currentUser.auth_level !== "teacher" && currentUser.auth_level !== "admin" ?  (currentUser.students[0].school.id) : (currentUser.schools[0].id))

      return fetch(`all_teachers/${filtered_school}`);
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }})
    .then((teachersData) => {
      setStaff(teachersData);
      setStaffButton(false)

      let filtered_school = currentUser.auth_level === "admin" && currentUser.schools.length === 0 ?  ("") : (currentUser.auth_level !== "teacher" && currentUser.auth_level !== "admin" ?  (currentUser.students[0].school.id) : (currentUser.schools[0].id))
      
      return fetch(`all_students/${filtered_school}`);
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }})
    .then((studentsData) => {
      setStudents(studentsData);
      setStudentButton(false)
      setLoggedIn(true);
    })
    .catch(error => console.error('Error:', error));
  }, [setCurrentUser, setStaff, setStudents]);

  return (
    <div>

    <NavBar setLoggedIn={setLoggedIn} staffButton={staffButton} studentButton={studentButton} />

    <Switch>

    <Route path="/schools/">
      <SchoolList/>
    </Route>

    <Route path="/teachers/">
      <TeacherList staff={staff} setStaff={setStaff} />
    </Route>

    <Route path="/students/">
      <StudentList students={students} setStudents={setStudents} />
    </Route>

    <Route path="/my_info/">
      <MyInfoPage/>
    </Route>

    <Route path="/">

      { currentUser.auth_level !== "admin" ? ("") : (<AdminPage 
      staff={staff} setStaff={setStaff}
      students={students} setStudents={setStudents}
      />)}

      { currentUser.auth_level !== "teacher" ? ("") : (<TeacherPage />)}

      { currentUser.auth_level !== "student" ? (""): (<StudentPage  />) }
 
    </Route> 
        
    </Switch> 

    </div>
    
  )
}

export default HomePage;
