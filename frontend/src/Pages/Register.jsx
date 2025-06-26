import React, { useContext, useState } from 'react'
import '../Css/Register.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Context } from '../main';
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



const Register = () => {

    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [password,setPassword] = useState('');
    const [gender,setGender] = useState('');
    const [dob,setDob] = useState('');

    const {isUserAuthenticated,setIsUserAuthenticated,setUser} = useContext(Context)
    const NavigateTo = useNavigate();


    const handlerRegister = async(e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:4000/api/v1/user/register",
                {firstName,lastName,email,phone,password,role:"User",gender,dob},{
                    withCredentials:true,
                    headers:{
                        "Content-Type" : "application/json"
                    }
                }
            )
            if(response.data.success){
                toast.success(response.data.message);
                setFirstName('');
                setLastName('');
                setEmail('');
                setPhone('');
                setPassword('');
                setGender('');
                setDob('');
                setUser(response.data.user)
                setIsUserAuthenticated(true);
                NavigateTo("/Login")
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    if(isUserAuthenticated){
        return <Navigate to="/"/>
    }

  return (
    <div className='register'>
        <form onSubmit={handlerRegister}>
        <div className='register-name'>
            <div>
            <h2>First Name</h2>
            <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} required/>
            </div>
            <div>
            <h2>Last Name</h2>
            <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} required/>
            </div>
        </div>
        <div className='register-email'>
        <div>
        <h2>Email</h2>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        </div>
        <div>
        <h2>Phone</h2>
            <input type="number" value={phone} onChange={(e)=>setPhone(e.target.value)} required/>
        </div>
        </div>
        <div className='register-passoword'>
        <div>
        <h2>Password</h2>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
        </div>
        <div className='register-gender'>
            <h2>Gender</h2>
            <select value={gender} onChange={(e)=>setGender(e.target.value)} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
        </div>
        </div>
        <div className='register-date'>
            <input type="Date" value={dob} onChange={(e)=>setDob(e.target.value)} required/>
        </div>
        <Link to="/Login" style={{textDecoration:"none"}}>
        <h3>Login</h3>
        </Link>
        <div className='register-button'>
            <button type='submit'>
                Register
            </button>
        </div>
        </form>
    </div>
  )
}

export default Register


 