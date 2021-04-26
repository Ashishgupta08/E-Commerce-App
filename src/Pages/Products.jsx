import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import './assets/css/product.css'
import {Nav} from '../components/Nav/Nav'
import { FaSlidersH } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { IoHeartOutline } from "react-icons/io5";
import { VscClose } from "react-icons/vsc";

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

  const [filter, setFilter] = useState("none")
  const opneFilters = () => {setFilter("block")};
  const closeFilters = () => {setFilter("none")};

  return (
    <>
    <div className="product-nav">
      <div><FaSlidersH className="icon" onClick={()=>{opneFilters()}} /></div>
      <div className="search">
        <BiSearch className="icon" />
        <input type="text" placeholder="Search for products" />
      </div>
    </div>
    <div className="filters" style={{display: filter}}>
      <VscClose className="close-icon" onClick={()=>{closeFilters()}}/>
      <div>
        <p>Sort By Price</p>
        <label><input type="radio" name="price" />Low to High</label>
        <label><input type="radio" name="price" />High to Low</label>
      </div>
      <div>
        <p>Filters</p>
        <fieldset>
          <legend>Colors</legend>
          <label><input type="checkbox" name="color" />Black</label>
          <label><input type="checkbox" name="color" />White</label>
          <label><input type="checkbox" name="color" />Blue</label>          
        </fieldset>
        <fieldset>
          <legend>Type</legend>
          <label><input type="checkbox" name="type" />Sports</label>
          <label><input type="checkbox" name="type" />Sneakers</label>
        </fieldset>
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