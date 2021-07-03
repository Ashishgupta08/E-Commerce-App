import axios from "axios";
import React, { useState } from "react";
import { useUser, useAuth, useProducts } from "../Contexts";
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { Nav } from '../Components/Nav/Nav';
import './assets/css/productdescription.css';

export function ProductDescription() {

    const { userState, userDispatch } = useUser();
    const { productsState } = useProducts();
    const { authState } = useAuth();
    const { id } = useParams();
    const viewProduct = productsState.products.find(item => item._id === id);
    const [inCart, setInCart] = useState(userState.cart.some(item => item.productId._id === id));
    const [isWishlisted, setIsWishlisted] = useState(userState.wishlist.some(item => item._id === id));

    const addToCart = async (product) => {
        try {
            if (authState.isUserLoggedIn) {
                await axios.post("https://e-commerce-backend.ashishgupta08.repl.co/cart", { productId: product._id }, { headers: { Authorization: authState.token } });
                userDispatch({ type: "ADD-TO-CART", payload: product });
                setInCart(!inCart)
            } else {
                console.log("Login to proceed.");
            }
        } catch (e) {
            console.log(e);
        }
    };

    const addToWishlist = async (product) => {
        try {
            if (authState.isUserLoggedIn) {
                await axios.post("https://e-commerce-backend.ashishgupta08.repl.co/wishlist", { productId: product._id }, { headers: { Authorization: authState.token } });
                userDispatch({ type: "ADD-TO-WISHLIST", payload: product });
                setIsWishlisted(!inCart)
            } else {
                console.log("Login to proceed.");
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <Nav />
            <div className="desc-page">
                <div key={viewProduct._id} className="desc-card">
                    <img src={viewProduct.imgUrl} alt="img" className="desc-img" />
                    <div className="desc-text">
                        <p className="card-secondary-text brand">{viewProduct.brand}</p>
                        <h4 className="card-heading">{viewProduct.name}</h4>
                        <p className="card-secondary-text">{viewProduct.category}</p>
                        <p className="card-primary-text">Rs. <span className="marked-price">{viewProduct.price.marked}</span>{viewProduct.price.selling}</p>
                        <div className="desc-btn-div">
                            {
                                isWishlisted
                                    ? <button className="desc-card-btn wishlist"> Wishlisted </button>
                                    : <button className="desc-card-btn wishlist" onClick={() => { addToWishlist(viewProduct) }} > Wishlist </button>
                            }
                            {
                                inCart
                                    ? <button className="desc-card-btn cart"> <NavLink to='/cart' className="link">Go to Bag </NavLink></button>
                                    : <button className="desc-card-btn cart" onClick={() => { addToCart(viewProduct) }} > Add to Bag </button>
                            }
                        </div>
                        <p className="card-secondary-text">{viewProduct.description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
