import React, { useState } from 'react'
import './Login.css'
import assets from '../../assets/assets'
import { signup, login } from '../../config/firebase'

const Login = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
    const [currState, setCurrState] = useState("Sign Up");

    const onSubmitHandler = (event) =>{
      event.preventDefault();
      if(currState === "Sign Up"){
        signup(username,email,password)
      }else{
        login(email, password);
      }
    }

  return (
    <div className='login'>
      <img src={assets.logo_big} alt="" className="logo" />
      <form onSubmit={onSubmitHandler} className="login-form">
        <h2>{currState}</h2>
        {currState === "Sign Up" ?<input onChange={(e)=>setUsername(e.target.value)} value={username} type="text" placeholder='Username' className='form-input' required />: null}
        <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='Email' className='form-input' required />
        <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder='Password' className='form-input' required />
        <button type='submit'>{currState === "Sign Up"? "Create account" : "Login"}</button>
        <div className="login-term">
            <input type="checkbox" />
            <p>Agree to the terms of Use & privacy Policy.</p>
        </div>
        <div className="login-forgot">

           {currState === "Sign Up" ? <p className="login-toggle">Already have an Account <span onClick={()=>setCurrState("Login")}>Login here</span></p>:
            <p className="login-toggle">Create an Account <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>}
        </div>
      </form>
    </div>
  )
}

export default Login
