import React from 'react'
import {NavLink} from 'react-router-dom'
import './assets/nav.css'
import {AiOutlineHome, AiOutlineHeart, AiOutlineShopping, AiOutlineUser} from "react-icons/ai";

export function Nav() {
    return (
        <>
        <nav className="nav">
            <div className="nav-header">
                <h1>100 STEPS</h1>
            </div>
            <div className="nav-mobile">
                <h1>100 STEPS</h1>
            </div>
            <div className="nav-links">
                <ul>
                    <li><NavLink to='/' className="link">
                        <AiOutlineHome className="nav-icon" />
                    </NavLink></li>
                    <li><NavLink to='/wishlist' className="link">
                        <AiOutlineHeart className="nav-icon" />
                    </NavLink></li>
                    <li><NavLink to='/cart' className="link">
                        <AiOutlineShopping className="nav-icon" />
                    </NavLink></li>
                    <li><NavLink to='/profile' className="link">
                        <AiOutlineUser className="nav-icon" />
                    </NavLink></li>
                </ul>
            </div>
        </nav>
        {/* <div className="nav-text">
            <h1>MYNTRA</h1>
        </div> */}
        </>
    )
    
}
