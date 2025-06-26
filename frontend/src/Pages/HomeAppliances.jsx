import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import '../Css/HomeAppliances.css'
import { FaArrowRight } from "react-icons/fa6";
import {Link, useNavigate} from 'react-router-dom'
import { Context } from '../main';


const HomeAppliances = () => {
  const [homeAppProduct,setHomeAppProduct] = useState([]);
  const navigateTo = useNavigate();
  const {isUserAuthenticated} = useContext(Context)
  

  useEffect(()=>{
    const fetchProduct = async()=>{
      try {
        const response = await axios.get("http://localhost:4000/api/v1/product/getProduct",{
          withCredentials:true,
        }) 
        const filtered = response.data.product.filter((item) => item.category === "HomeAppliances")
        setHomeAppProduct(filtered)
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
          quantity:1,
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
        <div className='container-banner-main homeappliances-container'>
        <h1>Home Appliances</h1>
        <h2>Transform your home with smart, stylish, and efficient appliances that make life easier.</h2>
        <p>Modern Living Starts Here. Up to 40% OFF on selected home appliances — don’t miss out on comfort and convenience.</p>
        </div>
            <div className='collection-button collection-homeapp'>
              <img src={"/new-arrivals/button-image/home-app-image.png"} alt="" className='button-image'/>
              <Link to={`/AllProduct?category=${"Home Appliances"}&subcategory=${"Refrigerators"}`}>
              <button> Shop Now <FaArrowRight size={24} color='#93745c'/></button>
              </Link>
            </div>
        <div className='container-image homeappliances-image'>
      <img src={"/new-arrivals/banner/home_apliances_bannner_img.webp"} alt="HomeAppliances banner"/>
        </div>
      </div>
      <h2 className='product-title gender-product-title-men'>HomeAppliances</h2>
      <div className='product-main men-main gender-product'>
      {homeAppProduct && homeAppProduct.length > 0 ? 
      homeAppProduct.map((element)=>{
        return (
          <div className='container-container gender-container' key={element._id}> 
            <Link to={`/ProductDetails/${element._id}`} style={{textDecoration:"none"}}>
            <img 
            src={element.images[0]?.url || element.images} 
            alt={element.product_name} 
            className='product_image'
          />
          <div className='product_name'>{element.product_name}</div>
          <h2 className='product_description'>{element.description}</h2>
          <div className='product_price'>{element.price} $</div>
          </Link>
          <div className='product_btn gender_btn'>
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

export default HomeAppliances
