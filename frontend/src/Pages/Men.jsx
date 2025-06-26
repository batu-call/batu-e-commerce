import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../Css/Men.css";
import { FaArrowRight } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { Context } from "../main";

const Men = () => {
  const [menProduct, setMenProduct] = useState([]);
  const { isUserAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/product/getProduct",
          {
            withCredentials: true,
          }
        );
        const filtered = response.data.product.filter(
          (item) => item.category === "Men"
        );
        setMenProduct(filtered);
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching products");
      }
    };
    fetchProduct();
  }, []);

  const handlerAddToCart = async (element) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/cart/addCart",
        {
          productId: element._id,
          quantity: 1,
        },
        {
          withCredentials: true,
        }
      );
      if (isUserAuthenticated) {
        toast.success(response.data.message);
        navigateTo("/ShoppingCart");
      } else {
        navigateTo("/Login");
        toast.info("Please Login!");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container">
      <div className="banner">
        <div className="container-banner-main container-main-men">
          <h1>Men’s Collection</h1>
          <h2>
            Elevate your wardrobe with versatile pieces made for the modern man.
            Shop now and unlock next-level confidence.
          </h2>
          <p>
            New Season. New Style. Up to 40% OFF on selected men’s wear — shop
            the look before it’s gone.
          </p>
        </div>
        <div className="collection-button">
          <img
            src={"/new-arrivals/button-image/men-image.png"}
            alt=""
            className="button-image"
          />
          <Link to={`/AllProduct?category=${"Men"}&subcategory=${"T-shirt"}`}>
            <button>
              {" "}
              Shop Now <FaArrowRight size={24} color="#93745c" />
            </button>
          </Link>
        </div>

        <div className="container-image">
          <img src={"/new-arrivals/banner/men_img.jpg"} alt="men banner" />
        </div>
      </div>
      <h2 className="product-title gender-product-title-men">Men</h2>
      <div className="product-main container-main gender-product">
        {menProduct && menProduct.length > 0 ? (
          menProduct.map((element) => (
            <div
              className="container-container gender-container"
              key={element._id}
            >
              <Link
                to={`/ProductDetails/${element._id}`}
                style={{ textDecoration: "none" }}
              >
                <img
                  src={element.images[0]?.url || element.images}
                  alt={element.product_name}
                  className="product_image"
                />
                <div className="product_name">{element.product_name}</div>
                <h2 className="product_description">{element.description}</h2>
                <div className="product_price">
                  {element.price.toFixed(2)} $
                </div>
              </Link>
              <div className="product_btn gender_btn">
                <button
                  onClick={(e) => {
                    handlerAddToCart(element, e);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="gender-no-product">No Products Available</div>
        )}
      </div>
    </div>
  );
};

export default Men;
