import React, { useState, useContext} from "react";
import { UserContext } from "../context/user";
import Axios from "axios"; 

function StudentForm({setAddStudent,addStudent, setDisabled}) {

  const [name, setStudentsName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("")
  const [password, setPassword] = useState("")
  const [password_confirmation, setPasswordConfirmation] = useState("")
  const [uploadImage, setUploadImage] = useState("")
  const [cloudinaryId, setCloudinaryId] = useState("")
  const [disableSave, setDisableSave] = useState(true)
  const [imageError, setImageError] = useState("")

  const [errors, setErrors] = useState([])
  const {currentUser} = useContext(UserContext);

  const handleImage = () => {
    const formData = new FormData();
    formData.append("file", uploadImage);
    formData.append("upload_preset", "xxxgbh6u");
    Axios.post("https://api.cloudinary.com/v1_1/denmhkyxq/image/upload",formData)
    .then((res) => {
        
      let url = res.data.secure_url.split("/v");
      let resize = "/w_256,h_256,c_thumb,g_face/";
      let profile_img = url[1].split("/")[1];

      setCloudinaryId(url[0]+resize+profile_img); 
      setDisableSave(false)
      setImageError("")

    })
    .catch((error) => { setImageError(error.message)})
  }

  const newStudent ={
    name,
    address,
    email,
    auth_level: "student",
    birthday,
    school_id: currentUser.teachers[0].school.id,
    password,
    password_confirmation,
    image: cloudinaryId,
  }

  function handleAddStudent(e) {
    e.preventDefault();
    fetch("/students", {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify(newStudent)
    }).then((response) => {
    if (response.ok) {
    response.json().then((data) => {
    setAddStudent(!addStudent)
    setDisabled(false)
    });
    } else {
    response.json().then((e) => setErrors(e.errors));
    }});
  }

  return (
    <div>

    <br></br>
    
    <div>
      <label>Profile Photo </label>
      <input type="file" onChange={(e) => {
        setUploadImage(e.target.files[0]);
      }}/>
      <button disabled={!disableSave} onClick={handleImage}>Upload</button>
    </div>

    <form  onSubmit={handleAddStudent}>

      <div>
        <label>Students Name </label>
          <input 
            type="text"
            value={name}
            placeholder='Please Enter Restaurant Name'
            onChange={(e) => setStudentsName(e.target.value)}
          />
      </div>

      <div>
        <label>Address </label>
          <input 
            type="text"
            value={address}
            placeholder='Please Enter Cuisine Type'
            onChange={(e) => setAddress(e.target.value)}
          />
      </div>

      <div>
        <label>Email </label>
          <input 
            type="text"
            value={email}
            placeholder='Please Enter a Description'
            onChange={(e) => setEmail(e.target.value)}
          />
      </div>

      <div>
        <label>Birthday </label>
          <input 
            type="text"
            value={birthday}
            placeholder='Please Enter a Description'
            onChange={(e) => setBirthday(e.target.value)}
          />
      </div>

      <div>
        <label>Password </label>
          <input 
            type="text"
            value={password}
            placeholder='Please Enter a Description'
            onChange={(e) => setPassword(e.target.value)}
          />
      </div>

      <div>
        <label>Password Confirmation </label>
          <input 
            type="text"
            value={password_confirmation}
            placeholder='Please Enter a Description'
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
      </div>

      <br></br>
      
      <button disabled={disableSave} type="submit" value="Save">Save Student</button>

      <button onClick={()=>{
        setAddStudent(!addStudent);
        setDisabled(false);
        }} variant="fill" color="primary" >
        Cancel 
      </button>

    </form>

    <br></br>

    <div>
      { errors.length <= 0 ? ("") : (
        errors.map((err) => (
        <li key={err}>{err}</li>
      )))}
      { imageError === ("") ? ("") : (imageError)}
    </div>

    </div>
  )
}

export default StudentForm