import React, { useContext, useEffect, useState } from 'react'
import '../Css/Main.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Context } from '../main';

const Main = () => {


    const [mainProduct,setMainProduct] = useState([]);
     const [product, setProduct] = useState({}); 
     const navigateTo = useNavigate();
      const {isUserAuthenticated,setIsUserAuthenticated} = useContext(Context)

    useEffect(()=>{
      const fetchProduct = async() => {
        try {
          const response  = await axios.get("http://localhost:4000/api/v1/product/getProduct",{
            withCredentials:true,
          });
          const mainFiltered = response.data.product;
          setMainProduct(mainFiltered.slice(-5))
          setProduct(response.data.product.id)
        } catch (error) {
          toast.error(error.response?.data?.message || "Error fetching products");
        }
      }
      fetchProduct();
    },[]);


    const handlerAddToCart = async(product,e) => {
      e.stopPropagation();
      try {
        const response  = await axios.post("http://localhost:4000/api/v1/cart/addCart",{
          productId:product._id,
          quantity:1
        },{
          withCredentials:true
        })
        if(isUserAuthenticated){
          toast.success(response.data.message);
          navigateTo("/ShoppingCart")
        }
        else {
           toast.info("Please Login!")
           navigateTo("/Login")
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }

  return (
    <div className='main'>
      <div className='main-left'>
        <h1 className='main-name'>
          Batu E-Commerce Site
        </h1>
        <h2 className='main-description'>
        Everything you are looking for is delivered to your door with just one click.
        </h2>
        <div className='main-new'>
          <h2 className='new-arrivals'>
          New Arrivals
          </h2>
             <Swiper spaceBetween={0} slidesPerView={2} navigation={true} modules={[Navigation]} className='main-swiper'>
            {Array.isArray(mainProduct) && mainProduct.length > 0 ? (
            mainProduct.map((element)=>(
              <SwiperSlide key={element._id}>
              <Link to={`/ProductDetails/${element._id}`} style={{textDecoration:"none"}}>
              <motion.div key={element._id}
               className="product-form-main"
               whileHover={{ scale: 1.05 }}
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.3 }}
             >
             <img 
               src={element.images[0]?.url || element.images} 
               alt={element.product_name} 
               className='product_image main-image'
             />
             <div className='product_name'>{element.product_name}</div>
             <h2 className='product_description'>{element.description}</h2>
             <div className='product_price main-price'>{element.price.toFixed(2)} $</div>
           </motion.div>
           </Link>
             <div className='product_btn main_btn'>
               <button onClick={(e) => {handlerAddToCart(element,e)}}>Add to Cart</button>
             </div>
           </SwiperSlide>
         )))
            : 
           ( <div>No Product</div>
           )}
           </Swiper>
        </div>
      </div>
      <div className='main-right'>
        <img src={"/banner_img.jpg"} alt="" />
      </div>
      <div className='main-btn'>
           <Link to="/AllProduct"><button>Start Exploring</button></Link>
      </div>
    </div>
  )
}

export default Main