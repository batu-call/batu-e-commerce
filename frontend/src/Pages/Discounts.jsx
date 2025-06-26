import React from 'react'
import '../Css/Discounts.css'
import {Link} from 'react-router-dom'

const Discounts = () => {
  return (
    <div className='discounts'>
      <img src={"/discount_banner.png"} alt="" />
      <div className='discounts-button'>
      <Link to="/AllProduct" style={{textDecoration:"none"}}>
      <button>
      Start Shopping</button>
      </Link>
      </div>
    </div>
  )
}

export default Discounts;