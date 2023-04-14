import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import "./Login.css"

function Login() {
 const [credentials , setCredentials] = useState({email:"",password:""});
 let navigate = useNavigate();
  const handleSubmit =async (e) =>{
    e.preventDefault();
    const response = await fetch("http://Localhost:5000/api/auth/login" ,{
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({email:credentials.email,password:credentials.password })
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
   //redirect
   localStorage.setItem('token', json.authtoken);
   navigate('/');
    }
    else{
      alert("Enter valid email and password");
    }
  }
  const onchange = (e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value});
}
  return (
        <>
           <div className="password-form">
      <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" value={credentials.email} onChange={onchange} id="email" placeholder="name@example.com" name="email"/>
                    <label htmlFor="floatingInput">Email address</label>
                  </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" value={credentials.password} onChange={onchange} id="password" placeholder="Create Password" name="password"/>
                    <label htmlFor="floatingInput">Create Password</label>
                  </div>
                  {/* <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="conformpassword"/>
                    <label htmlFor="floatingPassword">Conform Password</label>
                  </div> */}
            </div>
            <button type="submit">Login</button>
            </form>
    </div>
        </>
  )
}

export default Login