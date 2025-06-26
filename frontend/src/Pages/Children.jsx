import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import '../Css/Men.css'
import '../Css/Children.css'
import { FaArrowRight } from "react-icons/fa6";
import {Link, useNavigate} from 'react-router-dom'
import { Context } from '../main';


const Children = () => {
  const [childrenProduct,setChildrenProduct] = useState([]);
  const navigateTo = useNavigate();
  const {isUserAuthenticated} = useContext(Context);
  

  useEffect(()=>{
    const fetchProduct = async()=>{
      try {
        const response = await axios.get("http://localhost:4000/api/v1/product/getProduct",{
          withCredentials:true,
        }) 
        const filtered = response.data.product.filter((item) => item.category === "Children")
        setChildrenProduct(filtered)
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching products");
      }
    };
    fetchProduct();
  },[])

  const handlerAddToCart = async (element) => {
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
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className='container'>
      <div className='banner'>
        <div className='container-banner-main children-container'>
        <h1>Children’s Collection</h1>
        <h2>Style meets comfort for your little ones. Discover playful and practical fashion for every adventure.</h2>
        <p>Fresh Finds. Cute Styles. Up to 40% OFF on selected children’s clothing — shop now before they sell out.</p>
        </div>   
          <div className='collection-button collection-children'>
          <img src={"/new-arrivals/button-image/children-image.png"} alt="" className='button-image'/>
          <Link to={`/AllProduct?category=${"Children"}&subcategory=${"T-shirt"}`}>
          <button> Shop Now <FaArrowRight size={24} color='#93745c'/></button>
          </Link>
        </div>
        <div className='container-image children-image'>
      <img src={"/new-arrivals/banner/children_banner_img.jpg"} alt="Children banner"/>
        </div>
      </div>
      <h2 className='product-title gender-product-title-men'>Children</h2>
      <div className='product-main men-main gender-product'>
      {childrenProduct && childrenProduct.length > 0 ? 
      childrenProduct.map((element)=>{
        return (
          <div className='container-container gender-container' key={element._id} > 
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

export default Children
