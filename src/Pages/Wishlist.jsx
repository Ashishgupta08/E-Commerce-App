import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import {Nav} from '../components/Nav/Nav'
import { IoHeartOutline } from "react-icons/io5";
import './assets/css/wishlist.css'
export function Wishlist() {

    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        (async function () {
          try {
            const {
              data: { result }
            } = await axios.get("https://ecommerce.ashishgupta08.repl.co/wishlist");
            setWishlistItems(result);
            console.log(result);
          } catch (err) {
            console.log(err);
          }
        })();
    }, []);

    return (
      <>
      <div className="wishlist-nav">
        <div>
          <p>Wishlist</p>
          <p className="card-secondary-text">{wishlistItems.length} Items</p>
        </div>
      </div>
      <Nav />
      <div className="wishlist-page">
      {wishlistItems.map(product=>
          <div key={product._id} className="card">
            <div className="card-img">
              <img src={product.imgUrl} alt="img"/>
              <div className="heart-bg"><IoHeartOutline className="heart-fill-icon" /></div>
            </div>
            <div className="card_content">
              <p className="card-secondary-text">{product.type}</p>
              <h4 className="card-heading">{product.name}</h4>
              <p className="card-primary-text">Rs. {product.price.selling}</p>
              <button className="card-btn">Move to Bag</button>
            </div>
          </div>
        )}
      </div>
      </>
    )
}
