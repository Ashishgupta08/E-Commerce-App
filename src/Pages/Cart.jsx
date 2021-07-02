import React from 'react'
import { Nav } from '../Components/Nav/Nav'
import './assets/css/cart.css'
import { FaPlusSquare, FaMinusSquare } from "react-icons/fa";
import axios from 'axios';
import { useAuth, useUser } from "../Contexts";

export function Cart() {

    const { authState } = useAuth();
    const { userState, userDispatch } = useUser();

    const increaseQty = async (product) => {
        try {
            if (authState.isUserLoggedIn) {
                await axios.patch(`https://e-commerce-backend.ashishgupta08.repl.co/cart/${product.productId._id}`, { qty: product.qty + 1 }, { headers: { Authorization: authState.token } });
                userDispatch({ type: "INCREASE-QTY", payload: product.productId });
            } else {
                console.log("Login to proceed.")
            }
        } catch (e) {
            console.log(e);
        }
    };

    const decreaseQty = async (product) => {
        try {
            if (authState.isUserLoggedIn) {
                await axios.patch(`https://e-commerce-backend.ashishgupta08.repl.co/cart/${product.productId._id}`, { qty: product.qty - 1 }, { headers: { Authorization: authState.token } });
                userDispatch({ type: "DECREASE-QTY", payload: product.productId });
            } else {
                console.log("Login to proceed.")
            }
        } catch (e) {
            console.log(e);
        }
    };

    const remove = async (product) => {
        try {
            if (authState.isUserLoggedIn) {
                console.log(product)
                await axios.delete("https://e-commerce-backend.ashishgupta08.repl.co/cart", { headers: { Authorization: authState.token }, data: { productId: product.productId._id } });
                userDispatch({ type: "REMOVE-FROM-CART", payload: product.productId });
            } else {
                console.log("Login to proceed.")
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <div className="cart-nav">
                <div>
                    <p>Shopping Bag</p>
                    <p className="card-secondary-text">{userState.cart.length} Items</p>
                </div>
            </div>
            <Nav />
            <div className="cart-page">
                {userState.cart.map(item =>
                    <div key={item.productId._id} className="cart-card">
                        <img src={item.productId.imgUrl} alt="img" className="cart-card-img" />
                        <div className="cart-card-content">
                            <p className="card-secondary-text">{item.productId.type}</p>
                            <h4 className="card-heading">{item.productId.name}</h4>
                            <p className="card-secondary-text brand">{item.productId.brand}</p>
                            <p className="card-primary-text">Rs. {item.productId.price.selling}</p>
                            <div className="card-qty">
                                <p className="qty-name">Qty :</p>
                                <FaMinusSquare className="cart-icon" onClick={() => { item.qty>1 ? decreaseQty(item) : remove(item) }} />
                                <p className="qty">{item.qty}</p>
                                <FaPlusSquare className="cart-icon" onClick={() => { increaseQty(item) }} />
                            </div>
                            <p className="card-primary-text">Total Price - Rs. {item.productId.price.selling * item.qty}</p>
                            <button className="cart-btn" onClick={() => { remove(item) }}>Remove</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}