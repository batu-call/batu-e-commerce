import React, { useState } from 'react'
import '../Css/Communication.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaPhoneSquare } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { TbHours24 } from "react-icons/tb";


const Communication = () => {

  const [first_name,setFirst_name] = useState(''); 
  const [last_name,setLast_name] = useState(''); 
  const [message_email,setMessage_email] = useState(''); 
  const [message_phone,setMessage_phone] = useState(''); 
  const [send_message,setSend_message] = useState(''); 

  


    const handlerSubmit = async(e) => {
      e.preventDefault();

      try {
        const response = await axios.post("http://localhost:4000/api/v1/message/send",
          {first_name,last_name,message_email,message_phone,send_message},{
            withCredentials:true,
            headers:{
              "Content-Type": "application/json",
            }
          }
        );
        console.log(response.data);
        if(response.data.success){
          toast.success(response.data.message)
          setFirst_name('');
          setLast_name('');
          setMessage_email('');
          setMessage_phone('');
          setSend_message('');
        }
        else {
          toast.error(response.data.message  || "An unexpected error occurred")
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message || "Server error occurred");
        } else if (error.request) {
          toast.error("Could not connect to the server");
        } else {
          toast.error("An unexpected error occurred");
        }
      }
    }

  return (
    <div className='communication'>
      <div className='message'>
        <form onSubmit={handlerSubmit}>
        <div className='com-firstname'>
            <h2>First Name</h2>
            <input type="text" value={first_name} onChange={(e)=>setFirst_name(e.target.value)} required/>
        </div>
        <div className='com-lastname'>
            <h2>Last Name</h2>
            <input type="text" value={last_name} onChange={(e)=>setLast_name(e.target.value)} required/>
        </div>
        <div className='com-email'> 
            <h2>Email</h2>
            <input type="text" value={message_email} onChange={(e)=>setMessage_email(e.target.value)} required/>
        </div>
        <div className='com-phone'>
            <h2>Phone</h2>
            <input type="number" value={message_phone} onChange={(e)=>setMessage_phone(e.target.value)} required/>
        </div>
        <div className='com-message'>
          <h2>Message</h2>
          <input type="text" value={send_message} onChange={(e)=>setSend_message(e.target.value)} required/>
        </div>
        <div className='com-button'> 
        <button type='submit'>
          Send Message
        </button>
        </div>
        </form>
      </div>
      <div className='com-card'>
        <div className='com-card-main'>
          <h2>Communication</h2>
          <h3><FaPhoneSquare />  Phone  :<span>+1 0123-124124-124124</span></h3>
          <h3><MdEmail />   Email:  <span>Batucall3@gmail.com</span> </h3>
          <h3><TbHours24 />  Customer Service Hours  :<span>Phone and Live Chat Support 24/7</span></h3>
        </div>
        <hr />
        <div className='com-maps'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24156.930243504557!2d-74.0060155!3d40.7127281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjgiTiA3NMKwMDAnMjAuMCJX!5e0!3m2!1sen!2sus!4v1713972138231!5m2!1sen!2sus&hl=en " width="700" height="350" style={{border:"0"}} allowFullScreen ="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
  )
}

export default Communication