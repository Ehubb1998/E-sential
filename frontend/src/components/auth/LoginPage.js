import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import loginPic from "../../loginPic.jpg";
import { logIn, demo } from "../../store/actions/auth";

const LoginPage = (props) => {
    const dispatch = useDispatch();
    const errors = useSelector(state => state.auth.msg);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState("False");
    const [authErrors, setAuthErrors] = useState(false);

    useEffect(() => {
        if (errors) {
            setAuthErrors(true)
        }
    }, [errors])

    const loginButton = (e) => {
        e.preventDefault();
        dispatch(logIn(email, password, rememberMe));
    }
    const demoButton = (e) => {
        e.preventDefault();
        dispatch(demo());
    }
    const emailInput = (e) => {
        setEmail(e.target.value)
    }
    const passwordInput = (e) => {
        setPassword(e.target.value)
    }
    const clickedRememberMe = () => {
        if (rememberMe === "False") {
            setRememberMe("True")
        } else {
            setRememberMe("False")
        }
    }

    const loginErrors = (
        <div className="logInPage-mainDiv">
            <img src={loginPic} className="loginPic" alt="loginPic" />
            <div className="loginForm-backgroundDiv">
                <div className="loginForm-mainDiv">
                    <form className="loginForm">
                        <h6 className="loginErrors">{errors}</h6>
                        Welcome Back to E-sential
                        <label className="loginForm__label">
                            Email
                            {errors === "The provided Email does not exist" ? <input onChange={emailInput} className="loginForm__input-error" value={email} name="email" type="email" required /> : <input onChange={emailInput} className="loginForm__input" value={email} name="email" type="email" required />}
                        </label>
                        <label className="loginForm__label">
                            Password
                            {errors === "Incorrect Password" ? <input onChange={passwordInput} className="loginForm__input-error" value={password} name="password" type="password" required /> : <input onChange={passwordInput} className="loginForm__input" value={password} name="password" type="password" required />}
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
    )
    return (
        <>
        {authErrors === false ? <div className="logInPage-mainDiv">
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
        </div> : loginErrors}
        </>
    )
}

export default LoginPage;