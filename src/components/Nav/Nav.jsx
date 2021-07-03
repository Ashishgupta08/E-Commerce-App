import React from 'react'
import { NavLink } from 'react-router-dom'
import './nav.css'
import { AiOutlineHome, AiOutlineHeart, AiOutlineShopping, AiOutlineUser } from "react-icons/ai";

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
                        <li>
                            <NavLink end to='/' className="link" activeClassName="active-nav">
                                <span className="nav-text">Home</span>
                                <AiOutlineHome className="nav-icon" />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink end to='/wishlist' className="link" activeClassName="active-nav">
                                <span className="nav-text">Wishlist</span>
                                <AiOutlineHeart className="nav-icon" />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink end to='/cart' className="link" activeClassName="active-nav">
                                <span className="nav-text">Cart</span>
                                <AiOutlineShopping className="nav-icon" />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink end to='/profile' className="link" activeClassName="active-nav">
                                <span className="nav-text">Profile</span>
                                <AiOutlineUser className="nav-icon" />
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )

}
