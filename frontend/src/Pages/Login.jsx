import React, { useContext, useState } from 'react'
import '../Css/Login.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import { Context } from '../main';
import { Link } from 'react-router-dom';

const Login = () => {


  const {isUserAuthenticated,setIsUserAuthenticated ,setUser} = useContext(Context);
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const NavigateTo = useNavigate();

    const handlerLogin = async(e) => {
      e.preventDefault();

      try {
        const response = await axios.post("http://localhost:4000/api/v1/user/login",
          {email,password,role:"User"},
          {withCredentials:true,
            headers:{"Content-Type" : "application/json", }
          }
        )
        if(response.data.success){
          toast.success(response.data.message)
          setIsUserAuthenticated(true);
          setEmail('');
          setPassword('');
          setUser(response.data.user)

          localStorage.setItem('user',JSON.stringify(response.data.user));
          localStorage.setItem('isUserAuthenticated','true')

          NavigateTo("/")
        }
      } catch (error) {
        toast.error(error.response?.data?.message)
      }
    }
    if(isUserAuthenticated) {
      return <Navigate to={"/"}/>
    }
  

  return (
    <div className='login'>
      <form onSubmit={handlerLogin}>
      <h2>Login</h2>
      <div className='login-email'>
        <h3>Email</h3>
          <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}  required/>
      </div>
      <div className='login-password'>
        <h3>Password</h3>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
      </div>
      <Link to="/Register" style={{textDecoration:"none"}}>
      <h4>Register</h4>
      </Link>
      <div className='login-button'>
        <button type='submit'>
          Login
        </button>
      </div>
      </form>
    </div>
  )
}

export default Login