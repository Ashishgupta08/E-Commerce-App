import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { userReducer } from '../Reducers';
import { useAuth } from "./AuthContext";

const UserContext = createContext();

export function UserProvider({ children }){

    const [userState, userDispatch] = useReducer(userReducer, { userData: {}, wishlist: [], cart: [] })
    const { authState } = useAuth();

    useEffect(()=>{
        (async function(){
            const { data: { result } } = await axios.get("https://e-commerce-backend.ashishgupta08.repl.co/user/getUserData", { headers: { Authorization: authState.token } });
            userDispatch({ type: "LOAD", payload: result })
        })()
    },[authState])

    return(
        <UserContext.Provider value={{ userState, userDispatch }}>
            { children }
        </UserContext.Provider>
    )
}

export function useUser(){
    return useContext(UserContext)
}