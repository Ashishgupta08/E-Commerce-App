import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import { useCart } from "../Contexts/cart-context";
import {NavLink} from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { Nav } from '../components/index';
import './assets/css/productdescription.css';


export function ProductDescription() {

    const { cart, setCart } = useCart();
    const [buttonText, setButtonText] = useState("add to bag");
    const [product, setProduct] = useState({});
    const { id } = useParams();
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

    useEffect(() => {
        (async function () {
            try {
                const {
                data
                } = await axios.get("https://ecommerce.ashishgupta08.repl.co/products");
                setProduct(data.result.find(item => item._id === id));
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    console.log(product);

    return (
        <>
        <Nav />
        <div className="desc-page">
            <div key={product._id} className="cart-card card-desc">
                <img src={product.imgUrl} alt="img" className="cart-card-img" />
                <div className="cart-card-content">
                    <p className="card-secondary-text">{product.type}</p>
                    <h4 className="card-heading">{product.name}</h4>
                    <p className="card-secondary-text brand">{product.brand}</p>
                    <p className="card-primary-text">Rs. {product.selling}</p>
                    { buttonText === "add to bag" && <button className="card-btn" onClick={()=>{addToCart(product)}} >{buttonText}</button>}
                    { buttonText === "go to bag" && <NavLink to='/cart' className="link"><button className="card-btn">{buttonText}</button></NavLink>}
                </div>
            </div>
        </div>
        </>
    )
}
