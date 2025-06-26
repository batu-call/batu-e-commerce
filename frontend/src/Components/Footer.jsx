import React from 'react'
import '../Css/Footer.css'
import { Instagram } from 'lucide-react';
import { Twitter } from 'lucide-react';
import { Facebook } from 'lucide-react';
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
    <div className='footer-hr'></div>
        <div className='footer-main'>
        <div className='footer-link'> 
        <Link to={"/Men"} style={{textDecoration:"none"}}><h2>Men</h2></Link><hr />
            <Link to={"/Women"} style={{textDecoration:"none"}}><h2>Women</h2></Link><hr />
            <Link to={"/Children"} style={{textDecoration:"none"}}><h2>Children</h2></Link><hr />
            </div>
            <div className='footer-link-right'>
            <Link to={"/Shoes"} style={{textDecoration:"none"}}><h2>Shoes</h2></Link><hr />
            <Link to={"/Electronic"} style={{textDecoration:"none"}}><h2>Electronic</h2></Link><hr />
            <Link to={"/HomeAppliances"} style={{textDecoration:"none"}}><h2>Home Appliances</h2></Link><hr />
        </div>
        <div className='footer-description'>
            <p>Products displayed on this website are for demonstration purposes only and are not for sale.</p>
        </div>
        <div className='footer-communication'>
        <h4>Phone :+1 0123-124124-124124</h4>
        <h4>Email: Batucall3@gmail.com</h4>
        <h4>Customer Service Hours :Phone and Live Chat Support 24/7</h4>
        </div>
        <div className='footer-right'>
            <Link to={"/Discounts"} style={{textDecoration:"none"}}><h2>Discounts</h2></Link>
            <Link to={"/AboutUs"} style={{textDecoration:"none"}}><h2>About Us</h2></Link>
            <Link to={"/Communication"} style={{textDecoration:"none"}}><h2>Communication</h2></Link>
        </div>
        <div className='footer-icon'>
        <Instagram />
        <Twitter />
        <Facebook />
        </div>
        <div className='footer-reserved'>
          <h4>© 2025 Batu E-commerce. All rights reserved.</h4>
        </div>
    </div>
    </div>
  )
}

export default Footer