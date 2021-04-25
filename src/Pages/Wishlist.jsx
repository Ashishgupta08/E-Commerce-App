import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import {Nav} from '../components/Nav/Nav'

export function Wishlist() {

    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        (async function () {
          try {
            const {
              data: { result }
            } = await axios.get("https://ecommerce.ashishgupta08.repl.co/wishlist");
            setWishlistItems(result);
            console.log(result);
          } catch (err) {
            console.log(err);
          }
        })();
    }, []);

    return (
      <>
      <Nav />
      <div>
            <h1>Wishlist Page</h1>
            <h2>Number of Wishlist Items : {wishlistItems.length}</h2>
            {
                wishlistItems.map(product=>{
                    return(
                        <div key={product._id}>
                            <h3>{product.name}</h3>
                        </div>
                    )
                })
            }
        </div>
      </>
    )
}
