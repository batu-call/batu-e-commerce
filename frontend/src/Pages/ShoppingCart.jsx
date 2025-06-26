import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CircleX } from "lucide-react";
import "../Css/ShoppingCart.css";
import { Link, useNavigate } from "react-router-dom";
import { Minus } from "lucide-react";
import { Plus } from "lucide-react";
import Cookies from "js-cookie";
import { Context } from "../main";

const ShoppingCart = () => {
  const [getCart, setGetCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const { isUserAuthenticated, setCartItems } = useContext(Context);
  const navigateTo = useNavigate();



  useEffect(() => {
    if (!isUserAuthenticated) {
      navigateTo("/Login");
    } else {
      const getCartFetch = async () => {
        try {
          const response = await axios.get(
            "http://localhost:4000/api/v1/cart/getCart",
            {
              withCredentials: true,
            }
          );
          const cartItems = response.data.cart.items;
          setGetCart(cartItems);
          setCartItems(cartItems);
          const savedQuantity =
            JSON.parse(localStorage.getItem("quantity")) || {};

          const initialQuantities = {};
          cartItems.forEach((item) => {
            initialQuantities[item.productId._id] =
              savedQuantity[item.productId._id] || item.quantity;
          });
          setQuantities(initialQuantities);
          toast.success(response.data.message);
        } catch (error) {
          toast.error(error.response.data.message);
        }
      };
      getCartFetch();
    }
  }, [isUserAuthenticated,setCartItems,setGetCart,navigateTo]);

  const HandlerRemove = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/v1/cart/${productId}`,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setGetCart((prev) =>
        prev.filter((item) => item.productId._id !== productId)
      );
      setCartItems((prev) =>
        prev.filter((item) => item.productId._id !== productId)
      );

      setQuantities((prev) => {
        const updated = { ...prev };
        delete updated[productId];
        localStorage.setItem("quantity", JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const totalPrice = getCart.reduce((acc, item) => {
    const quantity = quantities[item.productId._id] || 1;
    return acc + item.productId.price * quantity;
  }, 0);

  const handlerQuantityChange = (productId, change) => {
    setQuantities((prev) => {
      const updateQuntity = (prev[productId] || 1) + change;
      const newQunatity = {
        ...prev,
        [productId]: updateQuntity < 1 ? 1 : updateQuntity,
      };
      localStorage.setItem("quantity", JSON.stringify(newQunatity));
      return newQunatity;
    });
  };

  return (
    <div className="cart">
      <div className="cart-left">
        <div className="cart-left-name">
          <h2>Items in Your Cart</h2>
        </div>
        {getCart && getCart.length > 0
          ? getCart.map((cart) => (
              <div key={cart.productId._id} className="cart-container">
                <div className="cart-main">
                  <img
                    src={cart.productId.images[0]?.url}
                    alt=""
                    className="cart-image"
                  />
                  <p className="cart-name">{cart.productId.product_name}</p>
                  <div className="shopping-qunatity-main">
                    <button
                      className="shopping-quantity"
                      onClick={() =>
                        handlerQuantityChange(cart.productId._id, -1)
                      }
                    >
                      <Minus />
                    </button>
                    <div className="shopping-qunaitity-name">
                      {quantities[cart.productId._id] || 1}
                    </div>
                    <button
                      className="shopping-quantity"
                      onClick={() =>
                        handlerQuantityChange(cart.productId._id, 1)
                      }
                    >
                      <Plus />
                    </button>
                  </div>

                  <p className="cart-price">
                    {(
                      cart.productId.price *
                      (quantities[cart.productId._id] || 1)
                    ).toFixed(2)}
                    $
                  </p>
                  <p className="cart-description">
                    {cart.productId.description}
                  </p>
                  <div
                    className="cart-remove"
                    onClick={() => HandlerRemove(cart.productId._id)}
                  >
                    <CircleX />
                  </div>
                </div>
              </div>
            ))
          : 
          <div className="cart-item-no-product">
            Your cart is empty
          </div>
          }
      </div>
      <div className="cart-right">
        <h2 className="cart-right-name">Order Summary</h2>
        <div className="cart-right-main">
          {getCart && getCart.length > 0
            ? getCart.map((cart) => (
                <div
                  key={cart.productId._id}
                  className="cart-item-price-container"
                >
                  <div className="cart-item-name">
                    {cart.productId.product_name}
                  </div>{" "}
                  <hr />
                  <div className="cart-item-price">
                    <h2>
                      Subtotal:{" "}
                      {(
                        cart.productId.price * quantities[cart.productId._id] ||
                        1
                      ).toFixed(2)}{" "}
                      $
                    </h2>
                  </div>
                  <hr />
                </div>
              ))
            :
            <div className="cart-item-no-product">
              No Product
            </div>
            }
          <br />
          <br />
          <hr />
          <div className="cart-right-button-price">
            <div className="cart-right-total-price">
              <h2>Discounts: 0.00 $</h2>
              <h2 className="cart-total-price">
                Total Price: {totalPrice.toFixed(2)} $
              </h2>
            </div>
            <div className="cart-right-button">
              <Link to="/Order"><button type="button">Complete Order</button></Link>
            </div>
          </div>
        </div>
        <Link to="/AllProduct" style={{ textDecoration: "none" }}>
          <h1 className="cart-right-continue">Continue Shopping</h1>
        </Link>
      </div>
    </div>
  );
};

export default ShoppingCart;
