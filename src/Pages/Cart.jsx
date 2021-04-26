import React from 'react'
import {Nav} from '../components/Nav/Nav'
import './assets/css/cart.css'
import { AiOutlineShopping } from "react-icons/ai";
import { FaPlusSquare, FaMinusSquare } from "react-icons/fa";

export function Cart() {
    return (
        <>
        <div className="cart-nav">
            <div>
            <p>Shopping Bag <AiOutlineShopping className="icon" /></p>
            <p className="card-secondary-text">0 Items</p>
            </div>
        </div>
        <Nav />
        <div className="cart-page">
            <div className="cart-card">
                {/* <div className="cart-card-img"> */}
                    <img src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/7575651/2020/5/21/f8645701-aee2-47d8-ab2d-8d82cf4027c71590079966024PumaMenBlueSneakers1.jpg" alt="img" className="cart-card-img" />
                {/* </div> */}
                <div className="cart-card-content">
                    <p className="card-secondary-text">Sneakers</p>
                    <h4 className="card-heading">Running Blue Shoes</h4>
                    <p className="card-secondary-text brand">PUMA</p>
                    <p className="card-primary-text">Rs. 1999</p>
                    <div className="card-qty">
                        <p className="qty-name">Qty :</p>
                        <FaMinusSquare className="cart-icon" />
                        <p className="qty">5</p>
                        <FaPlusSquare className="cart-icon" />
                    </div>
                    <button className="cart-btn">Remove</button>
                    {/* <button className="cart-card-btn move-btn">Move to Wishlist</button> */}
                </div>
            </div>
        </div>
        </>
    )
}