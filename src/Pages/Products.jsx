import React from "react";
import axios from "axios";
import { useEffect, useState, useReducer } from "react";
import './assets/css/product.css'
import {ProductCard, Nav } from '../components/index'
import LoadingScreen from "react-loading-screen";
import { useCart } from "../Contexts/cart-context";
import { useWishlist } from "../Contexts/wishlist-context";

export function Products() {

  const { setWishlist } = useWishlist();
  const { setCart } = useCart();
  const [products, dispatch] = useReducer(reducer, {productsList:[]})
  const [loader, setLoader] = useState(false)

  function reducer(state,action){
      switch (action.type) {
        case "LOAD":
          return {productsList: action.payload}
        case "LOW_TO_HIGH":
          return {productsList: state.productsList.sort((a,b)=>a.price.selling - b.price.selling)}
        case "HIGH_TO_LOW":
          return {productsList: state.productsList.sort((a,b)=>b.price.selling - a.price.selling)}    
        default:
          return state
      }
  }

  useEffect(() => {
    (async function () {
      setLoader(true);
      try {
        const {
          data: { result }
        } = await axios.get("https://ecommerce.ashishgupta08.repl.co/products");
        dispatch({payload: result, type: "LOAD"});
        const {
          data: { wishlist }
        } = await axios.get("https://ecommerce.ashishgupta08.repl.co/wishlist");
        setWishlist(wishlist);
        const { data: {cart} } = await axios.get("https://ecommerce.ashishgupta08.repl.co/cart");
        setCart(cart);
        setLoader(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
    <LoadingScreen
          loading={loader}
          bgColor="#f1f1f1"
          spinnerColor="#9ee5f8"
          textColor="#676767"
          text="Loading... Please Wait!"
    >
    </LoadingScreen>
    <div className="filters">
      <div>
        <p>Sort By Price</p>
        <label><input type="radio" name="price" onClick={()=>dispatch({type: "LOW_TO_HIGH"})} />Low to High</label>
        <label><input type="radio" name="price" onClick={()=>dispatch({type: "HIGH_TO_LOW"})} />High to Low</label>
      </div>
    </div>
    <Nav />
    <div className="product-page">
        {products.productsList.map(product=>
          <ProductCard  product={product}/>
        )}
    </div>
    </>
  );
}