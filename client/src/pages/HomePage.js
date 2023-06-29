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

// import { GoogleAPI, GoogleLogin, GoogleLogout } from "react-google-oauth";



function HomePage({setLoggedIn}) {

  
  const {currentUser, setCurrentUser} = useContext(UserContext);
  const [school, setSchool] = useState([]);
  const [enableButton, setEnableButton] = useState(true);

   useEffect(() => {
    fetch("/me")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }})
    .then((user) => {
      setCurrentUser(user);
      
      let filtered_school = currentUser.auth_level === "admin" && currentUser.schools.length === 0 ?  ("") : (currentUser.auth_level !== "teacher" && currentUser.auth_level !== "admin" ?  (currentUser.students[0].school.id) : (currentUser.schools[0].id))

      return fetch(`all_teachers/${filtered_school}`)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }})
    .then(data => {
      setSchool(data)
      setEnableButton(false)
    })
  }, [setCurrentUser]);

//   const responseGoogle = (response) => {
//     console.log(response, "I AM RESPONSE FROM GOOGLE")
//     var token = response;
//     var data = {
//       provider: "google_oauth2",
//       uid: token.Ca,
//       id_token: response.wc.id_token,
//       info: {
//         email: token.nt.Wt
//       }
//     }

//   console.log(data, "MY USER OBJECT I WANT TO SEND TO THE BACKEND")

//   const requestOptions = {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${response.wc.access_token}`,
//       'Content-Type': 'application/json',
//       'access_token': `${response.wc.access_token}`
//     },
//     body: JSON.stringify(data)
//   }
//   return fetch(`call back url set in the backend`, requestOptions)
//   .then(response => response.json())
//   .then(response => {
//     console.log(response,  "I AM  RESPONSE FROM THE BACKEND");
//     // do something
// })
//   .catch(err=>console.log(err))
// }
  

  return (
    <div>

    <NavBar setLoggedIn={setLoggedIn} enableButton={enableButton}/>

    <Switch>

    <Route path="/schools/">
      <SchoolList/>
    </Route>

    <Route path="/teachers/">
      <TeacherList school={school} />
    </Route>

    <Route path="/students/">
      <StudentList school={school} />
    </Route>

    <Route path="/my_info/">
        <MyInfoPage/>
    </Route>

    <Route path="/">
      { currentUser.auth_level !== "admin" ? ("") : (<AdminPage />)}

      { currentUser.auth_level !== "teacher" ? ("") : (<TeacherPage />)}

      { currentUser.auth_level !== "student" ? (""): (<StudentPage  />) }

        
      {/* <GoogleAPI className="GoogleLogin" clientId={CLIENT_ID}>
        <div>
          <GoogleLogin
            height="10"
            width="500px"
            backgroundColor="#4285f4"
            access="offline"
            scope="email profile"
            onLoginSuccess={responseGoogle}
            onFailure={responseGoogle}
          />
        </div>
      </GoogleAPI>
         */}
 
    </Route> 
        
    </Switch> 

    </div>
    
  )
}
export default HomePage;
