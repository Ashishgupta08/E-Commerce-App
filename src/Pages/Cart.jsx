import React from 'react'
import {Nav} from '../components/Nav/Nav'
import './assets/css/cart.css'
import { FaPlusSquare, FaMinusSquare } from "react-icons/fa";
import axios from 'axios';
import { useWishlist, useCart } from "../Contexts/index";

export function Cart() {

    const { cart, setCart } = useCart();

    if(cart.length === 0){
        (async function(){
            try{
                const { data: { cart } } = await axios.get("https://ecommerce.ashishgupta08.repl.co/cart");
                setCart(cart);
            }catch(e){
                console.log(e);
            }
        })();
    }
    
    const increaseQty = async (product) => {
        try {
            const data = await axios.post("https://ecommerce.ashishgupta08.repl.co/cart/update", { productId: product._id, operation: "add" });
            setCart(cart => cart.map(item => item._id===product._id ? {...item, qty: item.qty + 1} : item));
        } catch (e) {
            console.log(e);
        }
    };

    const decreaseQty = async (product) => {
        try{
            if(product.qty > 1){
                const data =  await axios.post("https://ecommerce.ashishgupta08.repl.co/cart/update", { productId: product._id, operation: "sub" });
                setCart(cart => cart.map(item => item._id === product._id ? {...item, qty: item.qty - 1} : item));
            }else{
                const data = await axios.post("https://ecommerce.ashishgupta08.repl.co/cart/remove", { productId: product._id });
                setCart(cart => cart.filter(item => item._id !== product._id ));
            }
        }catch(e){
            console.log(e);
        }
    };

    const remove = async (product) => {
        try{
            const data = await axios.post("https://ecommerce.ashishgupta08.repl.co/cart/remove", { productId: product._id });
            setCart(cart => cart.filter(item => item._id !== product._id ));
        }catch(e){
            console.log(e);
        }
    }

    return (
        <>
        <div className="cart-nav">
            <div>
            <p>Shopping Bag</p>
            <p className="card-secondary-text">{cart.length} Items</p>
            </div>
        </div>
        <Nav />
        <div className="cart-page">
            {cart.map(item => 
                <div key={item._id} className="cart-card">
                    <img src={item.imgUrl} alt="img" className="cart-card-img" />
                    <div className="cart-card-content">
                        <p className="card-secondary-text">{item.type}</p>
                        <h4 className="card-heading">{item.name}</h4>
                        <p className="card-secondary-text brand">{item.brand}</p>
                        <p className="card-primary-text">Rs. {item.price.selling}</p>
                        <div className="card-qty">
                            <p className="qty-name">Qty :</p>
                            <FaMinusSquare className="cart-icon" onClick={()=>{decreaseQty(item)}} />
                            <p className="qty">{item.qty}</p>
                            <FaPlusSquare className="cart-icon" onClick={()=>{increaseQty(item)}} />
                        </div>
                        <button className="cart-btn" onClick={()=>{remove(item)}}>Remove</button>
                    </div>
                </div>
            )}
        </div>
        </>
    )
}