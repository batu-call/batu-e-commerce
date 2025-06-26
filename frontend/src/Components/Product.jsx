import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Css/Product.css'
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import {Link, useNavigate} from 'react-router-dom'
import { Context } from '../main';

const Product = () => {
  
  const [product, setProduct] = useState([]); 
  const navigateTo = useNavigate();
  const {isUserAuthenticated} = useContext(Context)

  const handlerAddToCart = async(product,e) => {
    e.stopPropagation();
    try {
      const response = await axios.post("http://localhost:4000/api/v1/cart/addCart",{
        productId:product._id,
        quantity:1,
      },{
        withCredentials:true,
      });
      if(isUserAuthenticated){
        toast.success(response.data.message);
        navigateTo("/ShoppingCart");
      }
      else {
        toast.info("Please Login!");
        navigateTo("/Login")
      }
    } catch (error) {
      toast.error(error.response.data.message || "Error adding to cart");
    }

  }

  useEffect(() => {
    const fetchProduct = async() => {
      try {
        const {data} = await axios.get("http://localhost:4000/api/v1/product/getProduct", {
          withCredentials: true,
        });
        const filtered = data.product;
        setProduct(filtered.slice(1,11));
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching products");
      }
    } 
    fetchProduct();
  }, []);

  return (
    <div className='product'>
      <h2 className='product_newarrivals'>Most popular products</h2>
      <div className='product-main'>
      <Swiper spaceBetween={0} slidesPerView={5} navigation={true} modules={[Navigation]}> 
        {Array.isArray(product) && product.length > 0 ? (
          product.map((element) => ( 
            <SwiperSlide key={element._id}>
              <Link to={`/ProductDetails/${element._id}`} style={{textDecoration:"none"}}>
               <motion.div key={element._id}
                className="product-form"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
              <img 
                src={element.images[0]?.url || element.images} 
                alt={element.product_name} 
                className='product_image'
              />
              <div className='product_name'>{element.product_name}</div>
              <h2 className='product_description'>{element.description}</h2>
              <div className='product_price'>{element.price.toFixed(2)} $</div>
            </motion.div>
            </Link> 
              <div className='product_btn slider_btn'>
                <button onClick={(e) => handlerAddToCart(element,e)} >Add to Cart</button>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <div>No Products Available</div>
        )}
        </Swiper>
      </div>
    </div>
  )
}

export default Product