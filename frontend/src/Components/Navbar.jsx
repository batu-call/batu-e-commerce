import React, { useContext, useEffect } from 'react'
import '../Css/Navbar.css'
import { GiShoppingCart } from "react-icons/gi";
import { Bs1CircleFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../main';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import axios from 'axios';

const Navbar = () => {

  const {isUserAuthenticated,setIsUserAuthenticated,setUser,cartItems,setCartItems} = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/cart/getCart", {
          withCredentials: true,
        });
        const cartItems = response.data.cart.items;
        setCartItems(cartItems);
      } catch (error) {
        console.error("Cart fetch error", error);
      }
    };

    if (isUserAuthenticated) {
      fetchCart();
    } else {
      setCartItems([]); 
    }
  }, [isUserAuthenticated]);


  const handlerLogout = () => {
    setIsUserAuthenticated(false);
    setUser(null);
    setCartItems([]);
    localStorage.removeItem('user');
    localStorage.removeItem('isUserAuthenticated');
    Cookies.remove('UserToken')
    navigateTo('/Login');
    toast.success("Logged out successfully!");
  }
  return (
    <nav className='navbar'>
      <div className='navbar-category'>
        <Link to="/Men" style={{textDecoration:"none"}}><h2>Men</h2></Link>
       <Link to="/Women" style={{textDecoration:"none"}}><h2>Women</h2></Link>
        <Link to="/Children" style={{textDecoration:"none"}}><h2>Children</h2></Link>
        <Link to="/Shoes" style={{textDecoration:"none"}}><h2>Shoes</h2></Link>
        <Link to="/Electronic" style={{textDecoration:"none"}}><h2>Electronic</h2></Link>
        <Link to="/HomeAppliances" style={{textDecoration:"none"}}><h2>Home Appliances</h2></Link>
      </div>
      <div className='navbar-hero'>
        <Link to="/" style={{textDecoration:"none"}}><h2>Batu E-commerce Website</h2></Link>
      <Link to="/" style={{textDecoration:"none"}}><img src={"/main_img.png"} alt="" /></Link>
      </div>
    <div className='navbar-main'>
       <Link to="/Discounts" style={{textDecoration:"none"}}><h2>Discounts</h2></Link>
        <Link to="/AboutUs" style={{textDecoration:"none"}}><h2>About Us</h2></Link>
        <Link to="/Communication" style={{textDecoration:"none"}}><h2>Communication</h2></Link>
      </div>
      <div className='navbar-login'>
        <div className='navbar-icon'>
      <Link to={"/ShoppingCart"} style={{color:"black"} }>
      <GiShoppingCart size={40} style={{marginRight:"20px"}}/>
      </Link>
      <div className='cartItems-count'>
      {cartItems.length > 0 ? (
        <span>{cartItems.length}</span>
      ):
      <span className='cartItems-hidden'>0</span>
      }
      </div>
        </div>
        <div className='navbar-button'>
        {isUserAuthenticated ? 
        <button onClick={handlerLogout}>Logout</button> : 
        <Link to={"/Login"}>
        <button>
         Login
        </button>
        </Link>
        }
        </div>
      </div>
    </nav>  
  )
}

export default Navbar