import Raect from 'react'
import { useContext, createContext, useState } from 'react'

const CartContext = createContext();

export function CartProvider({ children }){

    const [cart, setCart] = useState([]);

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            { children }
        </CartContext.Provider>
    )
}

export function useCart(){
    return useContext(CartContext);
}