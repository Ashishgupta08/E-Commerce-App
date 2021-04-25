import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import './assets/css/product.css'
import {Nav} from '../components/Nav/Nav'
import { FaSlidersH } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { IoHeartOutline } from "react-icons/io5";

export function Products() {

  const [productsList, setProducts] = useState([]);

  const addToWishlist = (product) => {
    (async function(){
      try {
        console.log(product._id);
        // const {data:{result}} = await axios.post("https://ecommerce.ashishgupta08.repl.co/wishlist", {newWishlist: [product._id]});
        // console.log(result);
      } catch (err) {
        console.log(err);
      }
    })();
  };

  useEffect(() => {
    (async function () {
      try {
        const {
          data: { result }
        } = await axios.get("https://ecommerce.ashishgupta08.repl.co/products");
        setProducts(result);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
    <div className="product-nav">
      <div className="filter"><FaSlidersH className="icon" /></div>
      <div className="search">
        <BiSearch className="icon" />
        <input type="text" placeholder="Search for products" />
      </div>
    </div>
    <Nav />
    <div className="product-page">
      <div className="products">
        {productsList.map(product=>
          <div key={product._id} className="card">
            <div className="card-img">
              <img src={product.imgUrl} alt="img"/>
              <div className="heart-bg"><IoHeartOutline className="heart-icon" onClick={()=>{addToWishlist(product)}} /></div>
            </div>
            <div className="card_content">
              <p className="card-secondary-text">{product.type}</p>
              <h4 className="card-heading">{product.name}</h4>
              <p className="card-primary-text">Rs. {product.price.selling}</p>
              <button className="card-btn">Add to Bag</button>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}