import React from 'react'
import axios from "axios";
import {Nav} from '../components/Nav/Nav';
import { IoCloseCircleOutline } from "react-icons/io5";
import './assets/css/wishlist.css'
import { useWishlist } from "../Contexts/wishlist-context";
import { useCart } from "../Contexts/cart-context";

export function Wishlist() {

    const { setCart } = useCart();
    const { wishlist, setWishlist } = useWishlist();

    const updateWishlist = async (product) => {
      try {
        console.log(product);
        const data = await axios.post("https://ecommerce.ashishgupta08.repl.co/wishlist/update", { productId: product._id });
        setWishlist(wishlist => wishlist.filter(item => item._id !== product._id));
      } catch (e) {
        console.log(e);
      }
    };

    const updateCart = async (product) => {
      try {
        console.log(product);
        const data = await axios.post("https://ecommerce.ashishgupta08.repl.co/cart", { newCartItemId: product._id });
        setCart(cart => [...cart, { ...product, qty: 1 }]);
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <>
      <div className="wishlist-nav">
        <div>
          <p>Wishlist</p>
          <p className="card-secondary-text">{wishlist.length} Items</p>
        </div>
      </div>
      <Nav />
      <div className="wishlist-page">
      {wishlist.map(product=>
          <div key={product._id} className="wish-card">
            <div className="wish-card-img">
              <img src={product.imgUrl} alt="img"/>
              <div className="close-bg"><IoCloseCircleOutline className="close" onClick={()=>{updateWishlist(product)}} /></div>
            </div>
            <div className="wish-card-content">
              <p className="wish-card-secondary-text">{product.type}</p>
              <h4 className="wish-card-heading">{product.name}</h4>
              <p className="wish-card-primary-text">Rs. {product.price.selling}</p>
              <button className="wish-card-btn" onClick={()=>{updateCart(product)}}>Move to Bag</button>
            </div>
          </div>
        )}
      </div>
      </>
    )
}
