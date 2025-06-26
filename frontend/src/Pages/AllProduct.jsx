import React, { useContext, useEffect, useState } from 'react'
import '../Css/Allproduct.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPerson } from '@fortawesome/free-solid-svg-icons'
import { faPersonDress } from '@fortawesome/free-solid-svg-icons'
import { faChildren } from '@fortawesome/free-solid-svg-icons'
import { faShoePrints } from '@fortawesome/free-solid-svg-icons'
import { faLaptop } from '@fortawesome/free-solid-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { SquareChevronRight } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import Footer from '../Components/Footer';
import { Context } from '../main';




const AllProduct = () => {
  const [isOpenMen,setIsopenMen] = useState(false);
  const [isOpenWomen,setIsopenWomen] = useState(false);
  const [isOpenChildren,setIsopenChildren] = useState(false);
  const [isOpenShoes,setIsopenShoes] = useState(false);
  const [isOpenElectronic,setIsopenElectronic] = useState(false);
  const [isOpenHomeAppliances,setIsHomeAppliances] = useState(false);
  const [selectedCategory,setSelectedCategory] = useState('');
  const [products,setProduct] = useState([]);
  const [filteredProduct,setFilteredProduct] = useState([]);
  const {isUserAuthenticated} = useContext(Context)
  const navigateTo = useNavigate();

  

  useEffect(()=>{
    const subCategoryFetch = async() => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/product/getProduct",{
          withCredentials:true
        })
          setProduct(response.data.product)
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
    subCategoryFetch();
    if (window.location.hash) {
      const element = document.getElementById(window.location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  },[])

  
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const subCategory = searchParams.get('subcategory');

    useEffect(() => {
      const shuffleArray = (array) => {
        return [...array].sort(() => Math.random() - 0.5); 
      };
      if (category && subCategory) {
        const filtered = products.filter(
          (item) => item.category === category && item.subCategory === subCategory
        );
        setFilteredProduct(shuffleArray(filtered));
        setSelectedCategory(subCategory);
      }else {
        setFilteredProduct(shuffleArray(products));
        setSelectedCategory("All Products")
      }
    }, [products, category, subCategory]);
    
  const handlerAddToCart = async(element) => {
    try {
      const response = await axios.post("http://localhost:4000/api/v1/cart/addCart",{
        productId:element._id,
        quantity:1
      },{
        withCredentials:true
      })
      if(isUserAuthenticated){
        toast.success(response.data.message);
        navigateTo("/ShoppingCart")
      }
      else {
        navigateTo("/Login")
        toast.info("Please Login!");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  } 

  const handleCategoryClick = (subCategory,category) => {
    setSelectedCategory(subCategory);   
    const filtered = products.filter((item) => item.subCategory === subCategory && item.category === category)
    setFilteredProduct(filtered)
    setIsopenMen(false);
    setIsopenWomen(false);
    setIsopenChildren(false);
    setIsopenShoes(false);
    setIsopenElectronic(false);
    setIsHomeAppliances(false);
  }

  const toggleAccordionMen = () => {
    setIsopenMen(!isOpenMen)
    setIsopenWomen(false);
    setIsopenChildren(false);
    setIsopenShoes(false);
    setIsopenElectronic(false);
    setIsHomeAppliances(false);
  }
  const toggleAccordionWomen = () => {
    setIsopenWomen(!isOpenWomen)
    setIsopenMen(false);
    setIsopenChildren(false);
    setIsopenShoes(false);
    setIsopenElectronic(false);
    setIsHomeAppliances(false);
  }
  const toggleAccordionChildren = () => {
    setIsopenChildren(!isOpenChildren)
    setIsopenMen(false);
    setIsopenWomen(false);
    setIsopenShoes(false);
    setIsopenElectronic(false);
    setIsHomeAppliances(false);
  }
  const toggleAccordionShoes = () => {
    setIsopenShoes(!isOpenShoes)
    setIsopenMen(false);
    setIsopenWomen(false);
    setIsopenChildren(false);
    setIsopenElectronic(false);
    setIsHomeAppliances(false);
  }
  const toggleAccordionElectronic = () => {
    setIsopenElectronic(!isOpenElectronic)
    setIsopenMen(false);
    setIsopenWomen(false);
    setIsopenChildren(false);
    setIsopenShoes(false);
    setIsHomeAppliances(false);
  }
  const toggleAccordionAppliances = () => {
    setIsHomeAppliances(!isOpenHomeAppliances)
    setIsopenMen(false);
    setIsopenWomen(false);
    setIsopenChildren(false);
    setIsopenShoes(false);
    setIsopenElectronic(false);
  }

  return (
    <div className='allproduct'>
      <div className='allproduct-main'>
        <div className='allproduct-category-main'>
        <div className='category-name'>
        <h2>Category</h2>
        </div>
        <div className='allproduct-men' id='men'>
        <FontAwesomeIcon icon={faPerson} className='icon'/>
        <div className='allproduct-name'>
          <h2>Men</h2>
        <div onClick={toggleAccordionMen} className='accordion-header accordion-men'>
          {isOpenMen ? <ChevronUp size={50} /> : <ChevronDown size={50}/>}
        </div>
        </div>
        <hr />
        {isOpenMen && (
          <div className='accordion-content'>
            <ul>
              <li onClick={() =>handleCategoryClick('T-shirt','Men')}><SquareChevronRight />T-shirt</li>
              <li onClick={() =>handleCategoryClick('Pants','Men')}><SquareChevronRight />Pants</li>
              <li onClick={() =>handleCategoryClick('Jacket','Men')}><SquareChevronRight />Jacket</li>
              <li onClick={() =>handleCategoryClick('Sweatshirt','Men')}><SquareChevronRight />Sweatshirt</li>
              <li onClick={() =>handleCategoryClick('Shirt','Men')}><SquareChevronRight />Shirt</li>
              <li onClick={() =>handleCategoryClick('Pajamas','Men')}><SquareChevronRight />Pajamas</li>
            </ul>
          </div>
        )}
         </div>
         <div className='allproduct-women'>
         <FontAwesomeIcon icon={faPersonDress}  className='icon'/>
         <div className='allproduct-name'>
          <h2>Women</h2>
        <div onClick={toggleAccordionWomen} className='accordion-header accordion-women'>
          {isOpenWomen ? <ChevronUp size={50} /> : <ChevronDown size={50}/>}
        </div>
         </div>
         <hr />
        {isOpenWomen && (
          <div className='accordion-content'>
            <ul>
              <li onClick={() =>handleCategoryClick('T-shirt','Women')}><SquareChevronRight />T-shirt</li>
              <li onClick={() =>handleCategoryClick('Pants','Women')}><SquareChevronRight />Pants</li>
              <li onClick={() =>handleCategoryClick('Dress','Women')}><SquareChevronRight />Dress</li>
              <li onClick={() =>handleCategoryClick('Jacket','Women')}><SquareChevronRight />Jacket</li>
              <li onClick={() =>handleCategoryClick('Skirt','Women')}><SquareChevronRight />Skirt</li>
              <li onClick={() =>handleCategoryClick('Sweatshirt','Women')}><SquareChevronRight />Sweatshirt</li>
              <li onClick={() =>handleCategoryClick('Shirt','Women')}><SquareChevronRight />Shirt</li>
              <li onClick={() =>handleCategoryClick('Pajamas','Women')}><SquareChevronRight />Pajamas</li>
            </ul>
          </div>
        )}
         </div>
         <div className='allproduct-children'>
         <FontAwesomeIcon icon={faChildren}  className='icon'/>
         <div className='allproduct-name'>
          <h2>Children</h2>
        <div onClick={toggleAccordionChildren} className='accordion-header accordion-children'>
          {isOpenChildren ? <ChevronUp size={50} /> : <ChevronDown size={50}/>}
        </div>
         </div>
         <hr />
        {isOpenChildren && (
          <div className='accordion-content'>
            <ul>
              <li onClick={() =>handleCategoryClick('T-shirt','Children')}><SquareChevronRight />T-shirt</li>
              <li onClick={() =>handleCategoryClick('Pants','Children')}><SquareChevronRight />Pants</li>
              <li onClick={() =>handleCategoryClick('Jacket','Children')}><SquareChevronRight />Jacket</li>
              <li onClick={() =>handleCategoryClick('Sweatshirt','Children')}><SquareChevronRight />Sweatshirt</li>
              <li onClick={() =>handleCategoryClick('Shirt','Children')}><SquareChevronRight />Shirt</li>
              <li onClick={() =>handleCategoryClick('Pajamas','Children')}><SquareChevronRight />Pajamas</li>
            </ul>
          </div>
        )}
         </div>
         <div className='allproduct-shoes'>
         <FontAwesomeIcon icon={faShoePrints}  className='icon'/>
         <div className='allproduct-name'>
          <h2>Shoes</h2>
        <div onClick={toggleAccordionShoes} className='accordion-header accordion-shoes'>
          {isOpenShoes ? <ChevronUp size={50} /> : <ChevronDown size={50}/>}
        </div>
         </div>
         <hr />
        {isOpenShoes && (
          <div className='accordion-content'>
            <ul>
              <li onClick={() =>handleCategoryClick('Sneakers')}><SquareChevronRight />Sneakers</li>
              <li onClick={() =>handleCategoryClick('Boots')}><SquareChevronRight />Boots</li>
              <li onClick={() =>handleCategoryClick('Sandals')}><SquareChevronRight />Sandals</li>
              <li onClick={() =>handleCategoryClick('Loafers')}><SquareChevronRight />Loafers</li>
              <li onClick={() =>handleCategoryClick('Heels')}><SquareChevronRight />Heels</li>
              <li onClick={() =>handleCategoryClick('Flats')}><SquareChevronRight />Flats</li>
            </ul>
          </div>
        )}
         </div>
         <div className='allproduct-electronic'>
         <FontAwesomeIcon icon={faLaptop}  className='icon'/>
         <div className='allproduct-name'>
          <h2>Electronic</h2>
        <div onClick={toggleAccordionElectronic} className='accordion-header accordion-electronic'>
          {isOpenElectronic ? <ChevronUp size={50} /> : <ChevronDown size={50}/>}
        </div>
         </div>
         <hr />
        {isOpenElectronic && (
          <div className='accordion-content'>
            <ul>
              <li onClick={() =>handleCategoryClick('Mobile Phones')}><SquareChevronRight />Mobile Phones</li>
              <li onClick={() =>handleCategoryClick('Laptops & Tablets')}><SquareChevronRight />Laptops & Tablets</li>
              <li onClick={() =>handleCategoryClick('Televisions')}><SquareChevronRight />Televisions</li>
              <li onClick={() =>handleCategoryClick('Headphones & Earbuds')}><SquareChevronRight />Headphones & Earbuds</li>
              <li onClick={() =>handleCategoryClick('Cameras & Photography')}><SquareChevronRight />Cameras & Photography</li>
            </ul>
          </div>
        )}
         </div>
         <div className='allproduct-homeapp'>
         <FontAwesomeIcon icon={faHouse} className='icon'/>
         <div className='allproduct-name'>
          <h2>Home Appliances</h2>
        <div onClick={toggleAccordionAppliances} className='accordion-header'>
          {isOpenHomeAppliances ? <ChevronUp size={50} /> : <ChevronDown size={50}/>}
        </div>
         </div>
         <hr />
        {isOpenHomeAppliances && (
          <div className='accordion-content'>
            <ul>
             <li onClick={() =>handleCategoryClick('Refrigerators')}><SquareChevronRight />Refrigerators</li>
              <li onClick={() =>handleCategoryClick('Washing Machines')}><SquareChevronRight />Washing Machines</li>
              <li onClick={() =>handleCategoryClick('Microwave Ovens')}><SquareChevronRight />Microwave Ovens</li>
              <li onClick={() =>handleCategoryClick('Dishwashers')}><SquareChevronRight />Dishwashers</li>
              <li onClick={() =>handleCategoryClick('Vacuum Cleaners')}><SquareChevronRight />Vacuum Cleaners</li>
              <li onClick={() =>handleCategoryClick('Heaters')}><SquareChevronRight />Heaters</li>
              <li onClick={() =>handleCategoryClick('Coffee Makers')}><SquareChevronRight />Coffee Makers</li>
            </ul>
          </div>
        )}
         </div>    
        </div>
      </div>
      <div className='selected-main'>
        {selectedCategory && (
             <div className='product-main container-main selected-category'>
             {filteredProduct && filteredProduct.length > 0 ? 
             filteredProduct.map((element)=>(
               <div className='container-container selected-container' key={element._id}> 
                   <Link to={`/ProductDetails/${element._id}`} style={{textDecoration:"none", outline: "none"}}>
                   <img 
                   src={element.images[0]?.url || element.images} 
                   alt={element.product_name} 
                   className='product_image'
                 />
                 <div className='product_name'>{element.product_name}</div>
                 <h2 className='product_description'>{element.description}</h2>
                 <div className='product_price'>{element.price.toFixed(2)} $</div>
                </Link>
                 <div className='product_btn'>
                       <button onClick={(e) => {handlerAddToCart(element,e)}}>Add to Cart</button>
                     </div>
                 </div>
               )
             ) 
             :
             <div className='no-product'><h2>No Products Available</h2></div>}
           </div>
        )}
      </div>
    </div>
  )
}

export default AllProduct