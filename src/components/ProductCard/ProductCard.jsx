import React from 'react'
import axios from "axios";
import { IoHeartOutline } from "react-icons/io5";
import { useAuth, useUser } from "../../Contexts/index";
import { useNavigate } from "react-router-dom";

export function ProductCard(props) {

    const { product } = props;
    const navigate = useNavigate();
    const { userState, userDispatch } = useUser();
    const { authState } = useAuth();
    const isWishlisted = userState.wishlist.some(item => item._id === product._id);

    const addToWishlist = (product) => {
        (async function () {
            try {
                if(authState.isUserLoggedIn){
                    await axios.post("https://e-commerce-backend.ashishgupta08.repl.co/wishlist", { productId: product._id }, { headers: { Authorization: authState.token } });
                    userDispatch({ type: "ADD-TO-WISHLIST", payload: product });
                }else{
                    console.log("Login to proceed.")
                }
            } catch (err) {
                console.log(err);
            }
        })();
    };

    const removeFromWishlist = (product) => {
        (async function () {
            try {
                if(authState.isUserLoggedIn){
                    await axios.delete("https://e-commerce-backend.ashishgupta08.repl.co/wishlist", { headers: { Authorization: authState.token }, data: { productId: product._id } });
                    userDispatch({ type: "REMOVE-FROM-WISHLIST", payload: product });
                }else{
                    console.log("Login to proceed.")
                }
            } catch (err) {
                console.log(err);
            }
        })();
    }

    return (
        <div key={product._id} className="item-card" >
            <div className="card-img">
                <img src={product.imgUrl} alt="img" />
                <div className="heart-bg">
                    {
                        isWishlisted
                            ?
                            <IoHeartOutline className="heart-icon heart-fill" onClick={() => { removeFromWishlist(product) }} />
                            :
                            <IoHeartOutline className="heart-icon" onClick={() => { addToWishlist(product) }} />
                    }
                </div>
            </div>
            <div className="card-content" onClick={() => navigate(`/view/${product._id}`)}>
                <h4 className="card-heading">{product.name}</h4>
                <p className="card-secondary-text">{product.category}</p>
                <p className="card-primary-text">Rs. {product.price.selling}</p>
            </div>
        </div>
    )
}