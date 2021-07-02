import { React, useState } from 'react';
import { NavLink } from "react-router-dom";
import { useAuth } from "../Contexts";
import './assets/css/login.css'
import { useSnackbar } from 'react-simple-snackbar';
import { loginError } from "../Utils/snackbar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

export function Login() {

    const { authDispatch } = useAuth();
    const { state } = useLocation();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [openSnackbar] = useSnackbar(loginError);

    const login = async (credentials) => {
        try {
            const { data: { result }} = await axios.post("https://e-commerce-backend.ashishgupta08.repl.co/user/login", { username:credentials.username, password:credentials.password } );
            localStorage?.setItem("login", JSON.stringify({ isUserLoggedIn: true, token: result }))
            authDispatch({ type:"LOGIN", payload: result });
            navigate(state?.from ? state.from : "/");
        } catch (e) {
            if(e.response.status === 401){
                return openSnackbar('Wrong Password.', 2000)
            }else if(e.response.status === 404){
                return openSnackbar('Check Username and Password and try again.', 2000)
            }else{
                return openSnackbar(e.message, 2000)
            }
        }
    };

    const loginHandler = (data) => {
        if (data.username === "" || data.password === "") {
            openSnackbar('Username or Password cannot be empty.', 2000)
        } else {
            login(data);
        }
    }

    return (
        <>
            <div className="login-page">
                <div class="login-box">
                    <div className="box-content">
                        <h1 className="logo">100 STEPS</h1>
                        <div className="form">
                            <input type="test" placeholder="Username" className="login-input" required onChange={(e) => { setCredentials({ ...credentials, username: e.target.value }) }} />
                            <input type="password" placeholder="Password" className="login-input" required onChange={(e) => { setCredentials({ ...credentials, password: e.target.value }) }} />
                            <button type="submit" className="btn" onClick={() => { loginHandler(credentials) }}>Login</button>
                        </div>
                        <p style={{ color: '#000' }}>
                            Don't have an account?
                        </p>
                        <NavLink to='/signup' className="sign-up">SignUp</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}