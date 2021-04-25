import { NavLink } from "react-router-dom"
import './assets/css/home.css'
import {Nav} from '../components/Nav/Nav'

export function Home(){
    return(
        <>
        <Nav />
        <div className="home-page">
            <div className="header">
                <div className="header-bg"></div>
                <div className="header-text">
                    <p className="txt-1">DO IT NOW, RUN ON AIR</p>
                    <p className="txt-2">RUNNING SHOES</p>
                    <NavLink to='/products'>
                        <button><strong>SHOP NOW</strong></button>
                    </NavLink>
                </div>
            </div>
            <div>
                Lorem, ipsum dolor sit amet consectetur adipisicing
                elit. Est voluptas dicta consequatur rem minima 
                suscipit iure minus quas asperiores eum? Ab quibusdam
                unde, voluptatibus dolorem tempora omnis! Sed, 
                voluptatum animi!
            </div>
        </div>
        </>
    )
}
