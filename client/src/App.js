import { useEffect , useState, useContext} from "react";
import React from 'react';
import { Route, Switch} from "react-router-dom"
import Login from "./pages/Login"
import NavBar from "./components/NavBar"
import TeacherPage from "./pages/TeacherPage"
import { UserContext } from "./context/user";
import StudentPage from "./pages/StudentPage";
import TeacherList from "./pages/TeacherList";
import StudentList from "./pages/StudentsList";
import SchoolList from "./pages/SchoolList";
import MyInfoPage from "./pages/MyInfoPage";
import AdminPage from "./pages/AdminPage";
// import { GoogleAPI, GoogleLogin, GoogleLogout } from "react-google-oauth";



function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const {currentUser, setCurrentUser} = useContext(UserContext);
  

  useEffect(() => {
    fetch("/me")
    .then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setCurrentUser(data);
          setLoggedIn(true)});
    }});
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
      
    <h1>S.T.I.M.S</h1>
      
    <h3>Student Teacher Integrated Management System</h3>
        
    {!loggedIn ? (
    <Login setLoggedIn={setLoggedIn}/>
    ) : (
      
    <>

    <NavBar setLoggedIn={setLoggedIn} />

    <Switch>

    <Route path="/schools/">
      <SchoolList/>
    </Route>

    <Route path="/teachers/">
      <TeacherList/>
    </Route>

    <Route path="/students/">
      <StudentList/>
    </Route>

    <Route path="/my_info/">
        <MyInfoPage/>
    </Route>



    <Route path="/">
      { currentUser.auth_level !== "admin" ? ("") : (<AdminPage setLoggedIn={setLoggedIn}/>)}

      { currentUser.auth_level !== "teacher" ? ("") : (<TeacherPage setLoggedIn={setLoggedIn}/>)}

      { currentUser.auth_level !== "student" ? (""): (<StudentPage/>) }

        
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
          
    </>
      
    )}  
        
    </div>
    
  );
  
}

export default App;
