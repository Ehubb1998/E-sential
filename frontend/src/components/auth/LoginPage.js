import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import loginPic from "../../loginPic.jpg";
import { logIn, demo } from "../../store/actions/auth";

const LoginPage = (props) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const loginButton = (e) => {
        e.preventDefault();
        console.log("inside login function")
        dispatch(logIn(email, password, rememberMe));
    }
    const demoButton = (e) => {
        e.preventDefault();
        demo();
    }
    const emailInput = (e) => {
        setEmail(e.target.value)
    }
    const passwordInput = (e) => {
        setPassword(e.target.value)
    }
    const clickedRememberMe = () => {
        if (rememberMe === false) {
            setRememberMe(true)
        } else {
            setRememberMe(false)
        }
    }
    return (
        <>
        <div className="logInPage-mainDiv">
            <img src={loginPic} className="loginPic" alt="loginPic" />
            <div className="loginForm-backgroundDiv">
                <div className="loginForm-mainDiv">
                    <form className="loginForm">
                        Welcome Back to E-sential
                        <label className="loginForm__label">
                            Email
                            <input onChange={emailInput} className="loginForm__input" value={email} name="email" type="email" required />
                        </label>
                        <label className="loginForm__label">
                            Password
                            <input onChange={passwordInput} className="loginForm__input" value={password} name="password" type="password" required />
                        </label>
                        <button type="submit" onClick={loginButton} className="loginButton">Sign In</button>
                    </form>
                    <button type="submit" onClick={demoButton} className="demoButton">Demo</button>
                    <label className="checkboxContainer">Remember Me
                        <input onClick={clickedRememberMe} type="checkbox" />
                        <span className="checkmark"></span>
                    </label>
                </div>
            </div>
        </div>
        </>
    )
}

export default LoginPage;