import React from 'react'
import axios from "axios";
import { useState } from "react";
import {NavLink} from 'react-router-dom';
import { IoHeartOutline } from "react-icons/io5";
import { useCart } from "../../Contexts/cart-context";
import { useWishlist } from "../../Contexts/wishlist-context";    

export function ProductCard(props) {

    const {product} = props;

    const { wishlist, setWishlist } = useWishlist();
    const { cart, setCart } = useCart();

    const [buttonText, setButtonText] = useState("add to bag")
    const [like, setLike] = useState("heart-icon")

    const addToWishlist = (product) => {
        (async function(){
            try {
                if(wishlist.some(item => item._id === product._id)){
                    console.log("Already in the wishlist");
                }else {
                    const { data: { result } } = await axios.post("https://ecommerce.ashishgupta08.repl.co/wishlist", {newWishlist: [product._id]});
                    setWishlist(wishlist => [...wishlist, product]);
                    setLike("heart-icon heart-fill");
                }
            } catch (err) {
            console.log(err);
            }
        })();
        };

    const addToCart = async (product) => {
        try {
            if(cart.some(item => item._id === product._id)){
                const data = await axios.post("https://ecommerce.ashishgupta08.repl.co/cart/update", { productId: product._id, operation: "add" });
                setCart(cart => cart.map(item => item._id===product._id ? {...item, qty: item.qty + 1} : item));
                setButtonText("go to bag");
                console.log(product);
            }else {
                const data = await axios.post("https://ecommerce.ashishgupta08.repl.co/cart", { newCartItemId: product._id });
                setCart(cart => [...cart, { ...product, qty: 1 }]);
                setButtonText("go to bag");
                console.log(product);
            }
        } catch (e) {
            console.log(e);
        }
        };

    return (
        <div key={product._id} className="card">
            <div className="card-img">
                <img src={product.imgUrl} alt="img"/>
                <div className="heart-bg">
                    <IoHeartOutline className={like} onClick={()=>{addToWishlist(product)}} />
                </div>
            </div>
            <div className="card-content">
                <p className="card-secondary-text">{product.type}</p>
                <h4 className="card-heading">{product.name}</h4>
                <p className="card-primary-text">Rs. {product.price.selling}</p>
            </div>
            { buttonText === "add to bag" && <button className="card-btn" onClick={()=>{addToCart(product)}} >{buttonText}</button>}
            { buttonText === "go to bag" && <NavLink to='/cart' className="link"><button className="card-btn">{buttonText}</button></NavLink>}            
        </div>
    )
}