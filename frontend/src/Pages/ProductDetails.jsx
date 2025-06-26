import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../Css/ProductDetails.css";
import { Context } from "../main";
import { Link } from "react-router-dom";
import { Minus } from "lucide-react";
import { Plus } from "lucide-react";


const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigateTo = useNavigate();
  const [quantitiy, setQuantitiy] = useState(1);
  const { isUserAuthenticated } = useContext(Context);

  useEffect(() => {
    const getProductId = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/product/${id}`,
          {
            withCredentials: true,
          }
        );
        setProduct(response.data.product);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    getProductId();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const handlerQunatitiyChange = (change) => {
    setQuantitiy((prev) => {
      const newQuantity = prev + change;
      return newQuantity < 1 ? 1 : newQuantity;
    });
  };

  const handlerAddToCart = async (product, e) => {
    e.stopPropagation();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/cart/addCart",
        {
          productId: product._id,
          quantity: quantitiy,
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
      toast.error(error.response.data.message || "Error adding to cart");
    }
  };

  return (
    <div>
      <div className="product-details">
        <div className="product-details-main">
          <h2>Product Details</h2>
          <div className="product-details-left">
            <div className="product-details-image">
              <img
                src={product.images[0]?.url || product.images}
                alt={product.product_name}
                className="product_image details-image"
              />
              <div className="product-details-name">{product.product_name}</div>
            </div>
          </div>
          <div className="product-details-right">
            <div className="product-details-des">{product.description}</div>
            <div className="product-details-price">
              {(product.price * quantitiy).toFixed(2)}$
            </div>
            <div className="product-details-select-size">
              <button>XS</button>
              <button>S</button>
              <button>M</button>
              <button>L</button>
              <button>XL</button>
            </div>
            <div className="product-details-quantitiy">
              <h3 className="product-quantity-name">Quantity</h3>
              <button className="quntity-icon">
                <Minus onClick={() => handlerQunatitiyChange(-1)} />
              </button>
              <div className="quantity-number">{quantitiy}</div>
              <button className="quntity-icon">
                <Plus onClick={() => handlerQunatitiyChange(+1)} />
              </button>
            </div>
          </div>
        </div>
        <div className="product-details-button">
          <button type="submit" onClick={(e) => handlerAddToCart(product, e)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
