import { NavLink } from "react-router-dom"
import './assets/css/home.css'
import { Nav } from '../Components/Nav/Nav'
import { AiOutlineDoubleRight } from 'react-icons/ai'

export function Home() {
    return (
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
                <div className="gender-category-cards">
                    <div className="card men">
                        <div className="gender-category-card-text">
                            <h2>MENS</h2>
                            <NavLink to='/products'>
                                <button>SHOP COLLECTION<AiOutlineDoubleRight className="arrow" /></button>
                            </NavLink>
                        </div>
                    </div>
                    <div className="card women">
                        <div className="gender-category-card-text">
                            <h2>WOMENS</h2>
                            <NavLink to='/products'>
                                <button>SHOP COLLECTION<AiOutlineDoubleRight className="arrow" /></button>
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className="category-section">
                    <div className="category-header">
                        <h3>SHOP BY</h3>
                        <h1>CATEGORIES</h1>
                    </div>
                    <div className="category-options">
                        <div className="img-container">
                            <NavLink to='/products'>
                                <img
                                    src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/11097166/2019/12/10/cb47b7dc-e28a-4559-8388-8b82762b27681575980908117-HIGHLANDER-Men-White-Sneakers-661575980906633-1.jpg"
                                    alt="Sneakers" className="category-img"
                                />
                            </NavLink>
                            <p className="category-text">Sneakers</p>
                        </div>
                        <div className="img-container">
                            <NavLink to='/products'>
                                <img src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/11267034/2020/8/14/660b021d-df90-4635-b223-76f0a5d53c9c1597408185684-INVICTUS-Men-Black-Solid-Formal-Oxfords-5641597408184579-1.jpg"
                                    alt="Formal Shoes"
                                    className="category-img"
                                />
                            </NavLink>
                            <p className="category-text">Formal Shoes</p>
                        </div>
                        <div className="img-container">
                            <NavLink to='/products'>
                                <img src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/10876044/2020/3/13/96f86007-806e-4c30-aa42-de9874740ebd1584100230881-Puma-Men-Navy-Blue-Reeping-Xt-2-Idp-Running-Shoes-6615841002-1.jpg"
                                    alt="Sports Shoes"
                                    className="category-img"
                                />
                            </NavLink>
                            <p className="category-text">Sports Shoes</p>
                        </div>
                        <div className="img-container">
                            <NavLink to='/products'>
                                <img
                                    src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/13486124/2021/4/21/21e81dc0-4df4-4ef1-b2c0-a21958e28be41618983792611-Puma-Unisex-Casual-Shoes-3111618983792111-1.jpg"
                                    alt="Casual Shoes"
                                    className="category-img"
                                />
                            </NavLink>
                            <p className="category-text">Casual Shoes</p>
                        </div>
                        <div className="img-container">
                            <NavLink to='/products'>
                                <img
                                    src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/13442020/2021/6/8/443115eb-0a97-45b1-bb67-60097b3e88b11623126196543-ADIDAS-Originals-Men-Navy-Blue--White-ADILETTE-BOOST-Striped-1.jpg"
                                    alt="Flip Flops"
                                    className="category-img"
                                />
                            </NavLink>
                            <p className="category-text">Flip Flops</p>
                        </div>
                    </div>
                </div>
                <div style={{ margin: '1rem' }}>
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
