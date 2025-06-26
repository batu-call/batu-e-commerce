import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import '../Css/Electronic.css'
import { FaArrowRight } from "react-icons/fa6";
import {Link, useNavigate} from 'react-router-dom'
import { Context } from '../main';




const Electronic = () => {
  const [electronicProduct,setElectronicProduct] = useState([]);
  const navigateTo = useNavigate();
  const {isUserAuthenticated} = useContext(Context)
  

  useEffect(()=>{
    const fetchProduct = async()=>{
      try {
        const response = await axios.get("http://localhost:4000/api/v1/product/getProduct",{
          withCredentials:true,
        }) 
        const filtered = response.data.product.filter((item) => item.category === "Electronic")
        setElectronicProduct(filtered)
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching products");
      }
    };
    fetchProduct();
  },[])


  const handlerAddToCart = async(element) => {
    try {
      const response = await axios.post("http://localhost:4000/api/v1/cart/addCart",{
        productId:element._id,
        quantity:1
      }) 
       if(isUserAuthenticated){
                     toast.success(response.data.message);
                     navigateTo("/ShoppingCart");
                   }
                   else {
                     navigateTo("/Login");
                     toast.info("Please Login!")
                   }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className='container'>
      <div className='banner'>
        <div className='container-banner-main electronic-container'>
        <h1>Electronics</h1>
        <h2>Upgrade your tech game with cutting-edge electronics made for modern life. Smart, sleek, and powerful.</h2>
        <p>Hot Tech Deals. Fresh Gadgets. Save up to 40% on selected electronics — shop before the deals disappear.</p>
        </div>
          <div className='collection-button collection-electronic'>
          <img src={"/new-arrivals/button-image/electronic-image.png"} alt="" className='button-image'/>
          <Link to={`/AllProduct?category=${"Electronic"}&subcategory=${"Mobile Phones"}`}>
          <button> Shop Now <FaArrowRight size={24} color='#93745c'/></button>
          </Link>
        </div>
        <div className='container-image electronic-image'>
      <img src={"/new-arrivals/banner/Electronics_banner.jpg"} alt="Electronic banner"/>
        </div>
      </div>
      <h2 className='product-title gender-product-title-men'>Electronic</h2>
      <div className='product-main container-main gender-product'>
      {electronicProduct && electronicProduct.length > 0 ? 
      electronicProduct.map((element)=>{
        return (
          <div className='container-container gender-container' key={element._id} > 
            <Link to={`/ProductDetails/${element._id}`}  style={{textDecoration:"none"}}>
            <img 
            src={element.images[0]?.url || element.images} 
            alt={element.product_name} 
            className='product_image'
          />
          <div className='product_name'>{element.product_name}</div>
          <h2 className='product_description'>{element.description}</h2>
          <div className='product_price'>{element.price} $</div>
           </Link>
          <div className='product_btn gender_btn gender_btn'>
                    <button onClick={(e) => {handlerAddToCart(element,e)}}>Add to Cart</button>
              </div>
          </div>
        )
      }) 
      :
      <div className='gender-no-product'>No Products Available</div>}
    </div>
    </div>
 )
}

export default Electronic
