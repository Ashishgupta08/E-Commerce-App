import React from 'react'
import axios from "axios";
import { useState } from "react";
import { IoHeartOutline } from "react-icons/io5";
import { useWishlist } from "../../Contexts/wishlist-context";
import { useNavigate } from "react-router-dom";

export function ProductCard(props) {

    const {product} = props;
    const navigate = useNavigate();
    const { wishlist, setWishlist } = useWishlist();
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

    return (
        <div key={product._id} className="card" onClick={() => navigate(`/view/${product._id}`)}>
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
        </div>
    )
}