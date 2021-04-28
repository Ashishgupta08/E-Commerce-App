import React from "react";
import axios from "axios";
import { useEffect, useState, useReducer } from "react";
import './assets/css/product.css'
import { Nav } from '../components/Nav/Nav'
import { FaSlidersH } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { IoHeartOutline } from "react-icons/io5";
import { VscClose } from "react-icons/vsc";
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
        case "LOWTOHIGH":
          return {productsList: state.productsList.sort((a,b)=>a.price.selling - b.price.selling)}
        case "HIGHTOLOW":
          return {productsList: state.productsList.sort((a,b)=>b.price.selling - a.price.selling)}
        case "BLACK":
          return {productsList: state.productsList.filter(product=>product.color.toLowerCase() === "black")}
        case "WHITE":
          return {productsList: state.productsList.filter(product=>product.color.toLowerCase() === "white")}
        case "BLUE":
            return {productsList: state.productsList.filter(product=>product.color.toLowerCase() === "blue")}
        case "SPORTS":
            return {productsList: state.productsList.filter(product=>product.type.toLowerCase() === "sports")}
        case "SNEAKERS":
            return {productsList: state.productsList.filter(product=>product.type.toLowerCase() === "sneakers")}    
        default:
          return state
      }
  }

  const addToWishlist = (product) => {
    (async function(){
      try {
        const { data: { result } } = await axios.post("https://ecommerce.ashishgupta08.repl.co/wishlist", {newWishlist: [product._id]});
        setWishlist(wishlist => [...wishlist, product]);
      } catch (err) {
        console.log(err);
      }
    })();
  };

  const addToCart = async (product) => {
    try {
      console.log(product);
      const data = await axios.post("https://ecommerce.ashishgupta08.repl.co/cart", { newCartItemId: product._id });
      setCart(cart => [...cart, { ...product, qty: 1 }]);
    } catch (e) {
      console.log(e);
    }
  };

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

  const [filter, setFilter] = useState("none")
  const opneFilters = () => {setFilter("block")};
  const closeFilters = () => {setFilter("none")};

  return (
    <>
    <LoadingScreen
          loading={loader}
          bgColor="#f1f1f1"
          spinnerColor="#9ee5f8"
          textColor="#676767"
          // logoSrc="/logo.png"
          text="Loading.... Please Wait!"
    >
    </LoadingScreen>
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
        <label><input type="radio" name="price" onClick={()=>dispatch({type: "LOWTOHIGH"})} />Low to High</label>
        <label><input type="radio" name="price" onClick={()=>dispatch({type: "HIGHTOLOW"})} />High to Low</label>
      </div>
      <div>
        <p>Filters</p>
        <fieldset>
          <legend>Colors</legend>
          <label><input type="checkbox" name="color" onChange={()=>dispatch({payload: "COLOR", type: "BLACK"})} />Black</label>
          <label><input type="checkbox" name="color" onChange={()=>dispatch({payload: "COLOR", type: "WHITE"})} />White</label>
          <label><input type="checkbox" name="color" onChange={()=>dispatch({payload: "COLOR", type: "BLUE"})} />Blue</label>          
        </fieldset>
        <fieldset>
          <legend>Type</legend>
          <label><input type="checkbox" name="type" onChange={()=>dispatch({payload: "TYPE", type: "SPORTS"})} />Sports</label>
          <label><input type="checkbox" name="type" onChange={()=>dispatch({payload: "TYPE", type: "SNEAKERS"})} />Sneakers</label>
        </fieldset>
      </div>
    </div>
    <Nav />
    <div className="product-page">
        {products.productsList.map(product=>
          <div key={product._id} className="card">
            <div className="card-img">
              <img src={product.imgUrl} alt="img"/>
              <div className="heart-bg"><IoHeartOutline className="heart-icon" onClick={()=>{addToWishlist(product)}} /></div>
            </div>
            <div className="card-content">
              <p className="card-secondary-text">{product.type}</p>
              <h4 className="card-heading">{product.name}</h4>
              <p className="card-primary-text">Rs. {product.price.selling}</p>
            </div>
            <button className="card-btn" onClick={()=>{addToCart(product)}} >Add to Bag</button>
          </div>
        )}
    </div>
    </>
  );
}