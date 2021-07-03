import React from 'react'
import axios from "axios";
import { Nav } from '../Components/Nav/Nav';
import { IoCloseCircleOutline } from "react-icons/io5";
import './assets/css/wishlist.css'
import { useAuth, useUser } from "../Contexts";

export function Wishlist() {

  const { authState } = useAuth();
  const { userState, userDispatch } = useUser();

  const updateWishlist = async (product) => {
    try {
      if (authState.isUserLoggedIn) {
        await axios.delete("https://e-commerce-backend.ashishgupta08.repl.co/wishlist", { headers: { Authorization: authState.token }, data: { productId: product._id } });
        userDispatch({ type: "REMOVE-FROM-WISHLIST", payload: product });
      } else {
        console.log("Login to proceed.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateCart = async (product) => {
    try {
      if (authState.isUserLoggedIn) {
        await axios.post("https://e-commerce-backend.ashishgupta08.repl.co/cart", { productId: product._id }, { headers: { Authorization: authState.token } });
        await axios.delete("https://e-commerce-backend.ashishgupta08.repl.co/wishlist", { headers: { Authorization: authState.token }, data: { productId: product._id } });
        userDispatch({ type: "ADD-TO-CART", payload: product });
        userDispatch({ type: "REMOVE-FROM-WISHLIST", payload: product });
      } else {
        console.log("Login to proceed.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="wishlist-nav">
        <div>
          <p>Wishlist</p>
          <p className="card-secondary-text">{userState.wishlist.length} Items</p>
        </div>
      </div>
      <Nav />
      <div className="wishlist-page">
        {userState.wishlist.map(product =>
          <div key={product._id} className="wish-card">
            <div className="wish-card-img">
              <img src={product.imgUrl} alt="img" />
              <div className="close-bg"><IoCloseCircleOutline className="close" onClick={() => { updateWishlist(product) }} /></div>
            </div>
            <div className="wish-card-content">
              <p className="wish-card-secondary-text">{product.type}</p>
              <h4 className="wish-card-heading">{product.name}</h4>
              <p className="wish-card-primary-text">Rs. {product.price.selling}</p>
              {
                userState.cart.some(item => item.productId._id === product._id)
                  ? <button className="wish-card-btn">Already in Bag</button>
                  : <button className="wish-card-btn" onClick={() => { updateCart(product) }}>Move to Bag</button>
              }
            </div>
          </div>
        )}
      </div>
    </>
  )
}
