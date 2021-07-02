import { createContext, useContext, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) { 

    const navigate = useNavigate();
    const { isUserLoggedIn, token: savedToken } = JSON.parse(localStorage.getItem("login")) || { isUserLoggedIn: false, token: null };

    const [authState, authDispatch] = useReducer(authReducer, { isUserLoggedIn, token: savedToken });

    const logout = () => {
        try {
            localStorage?.removeItem("login");
            authDispatch({ type:"LOGOUT" });
            navigate("/");
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const { isUserLoggedIn, token } = JSON.parse(localStorage?.getItem("login")) || {};
        isUserLoggedIn && authDispatch({ type:"LOGIN", payload: token });
    }, [])

    return (
        <AuthContext.Provider value={{ authState, authDispatch, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

export function authReducer(state, action){
    switch (action.type) {
        case "LOGIN":
            return { ...state, isUserLoggedIn: true, token: action.payload }
        case "LOGOUT":
            return { ...state, isUserLoggedIn: false, token: null }
        default:
            return state
    }
}