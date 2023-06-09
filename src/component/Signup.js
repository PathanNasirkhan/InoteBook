import React ,{ useState } from 'react'
import { useNavigate } from 'react-router-dom';
function Signup(props) {
   
let pass = document.getElementById('password');
let cpass = document.getElementById('conformpassword');

  const [credentials , setCredentials] = useState({name:"",email:"",password:"",conformpassword:""});
  let navigate = useNavigate();
   const handleSubmit =async (e) =>{
     e.preventDefault();
     const response = await fetch("http://Localhost:5000/api/auth/createuser" ,{
       method: "POST",
       headers: {
         "Content-Type": 'application/json',
       },
       body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password })
     });
     const json = await response.json();
     console.log(json);
     if(json.success){
    //redirect
    localStorage.setItem('token', json.authtoken);
    navigate('/');
    props.showAlert("Succesfully Acount Created ",'success');
     }
     else{
       props.showAlert("Invalid credentials",'danger');
     }
   }
   const onchange = (e)=>{
     setCredentials({...credentials,[e.target.name]:e.target.value});
 }
  return (
    <div className="password-form mt-5">
    <h2>SingUp</h2>
      <form onSubmit={handleSubmit}>
          <div>
              <div className="form-floating mb-3">
                  <input type="text" className="form-control" value={credentials.name} onChange={onchange} id="name" placeholder="Enter name" name="name" />
                  <label htmlFor="floatingInput">Name</label>
                </div>
              <div className="form-floating mb-3">
                  <input type="email" className="form-control" value={credentials.email} onChange={onchange} id="email" placeholder="name@example.com" name="email"/>
                  <label htmlFor="floatingInput">Email address</label>
                </div>
              <div className="form-floating mb-3">
                  <input type="password" className="form-control" value={credentials.password} onChange={onchange} id="password" placeholder="Create Password" name="password" minLength={5} required/>
                  <label htmlFor="floatingInput">Create Password</label>
                </div>
                <div className="form-floating">
                  <input type="password" className="form-control" id="conformpassword" placeholder="Password" name="conformpassword" minLength={5} required/>
                  <label htmlFor="floatingPassword">Conform Password</label>
                </div>
          </div>
          <button  type="submit">Signup</button>
          </form>
  </div>
  )
}

export default Signup