import { createContext, useContext, useEffect, useReducer } from "react";
import axios from 'axios';
import { productsReducer } from "../Reducers";

const ProductsContext = createContext();

export function ProductsProvider({ children }){

    const [productsState, productsDispatch] = useReducer(productsReducer, { products: [] })

    useEffect(()=>{
        (async function(){
            const { data: { result } } = await axios.get("https://e-commerce-backend.ashishgupta08.repl.co/product");
            productsDispatch({ type: "LOAD", payload: result })
        })()
    },[])

    return(
        <ProductsContext.Provider value={{ productsState, productsDispatch }}>
            { children }
        </ProductsContext.Provider>
    )
}

export function useProducts(){
    return useContext(ProductsContext)
}