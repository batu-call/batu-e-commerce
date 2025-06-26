import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import '../Css/Men.css'
import { FaArrowRight } from "react-icons/fa6";
import {Link, useNavigate} from 'react-router-dom'
import { Context } from '../main';


  const Women = () => {
    const [womenProduct,setWomenProduct] = useState([]);
    const navigateTo = useNavigate();
    const {isUserAuthenticated} = useContext(Context)
  
    useEffect(()=>{
      const fetchProduct = async()=>{
        try {
          const response = await axios.get("http://localhost:4000/api/v1/product/getProduct",{
            withCredentials:true,
          }) 
          const filtered = response.data.product.filter((item) => item.category === "Women")
          setWomenProduct(filtered)
        } catch (error) {
          toast.error(error.response?.data?.message || "Error fetching products");
        }
      };
      fetchProduct();
    },[])

    const HandlerAddToCart = async(element) => {
      try {
        const response = await axios.post("http://localhost:4000/api/v1/cart/addCart",{
          productId:element._id,
          quantity:1,
        },{
          withCredentials:true
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
        toast.error(error.response.data.message)
      }
    }


  return (
       <div className='container'>
      <div className='banner'>
        <div className='container-banner-main women-container'>
        <h1>Women’s Collection</h1>
        <h2>Refresh your style with timeless pieces designed for every woman. Discover elegance and confidence in every outfit.</h2>
        <p>New Arrivals. Bold Looks. Enjoy up to 40% OFF on selected women’s wear — grab your favorites before they’re gone.</p>
        </div>
         <div className='collection-button'>
                    <img src={"/new-arrivals/button-image/women-image.png"} alt="" className='button-image'/>
                      <Link to={`/AllProduct?category=${"Women"}&subcategory=${"T-shirt"}`}>
                    <button> Shop Now <FaArrowRight size={24} color='#93745c'/></button>
                    </Link>
                  </div>
        <div className='container-image'>
      <img src={"/new-arrivals/banner/women_banner_img.jpg"} alt="women banner"/>
        </div>
      </div>
      <h2 className='product-title gender-product-title-men'>Women</h2>
      <div className='product-main men-main container-main gender-product'>
      {womenProduct && womenProduct.length > 0 ? 
      womenProduct.map((element)=>{
        return (
          <div className='container-container gender-container' key={element._id}> 
            <Link to={`/ProductDetails/${element._id}`} style={{textDecoration:"none"}} >
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
                    <button onClick={(e) => {HandlerAddToCart(element,e)}}>Add to Cart</button>
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

export default Women