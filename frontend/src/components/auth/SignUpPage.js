import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import signupPic from "../../signupPic.jpeg"
import { signUp, demo } from "../../store/actions/auth";

const SignUpPage = (props) => {
    const dispatch = useDispatch();
    const errors = useSelector(state => state.auth.msg);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [job, setJob] = useState("");
    const [primaryBank, setPrimaryBank] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [authErrors, setAuthErrors] = useState(false);
    const [rememberMe, setRememberMe] = useState("False");

    useEffect(() => {
        if (errors) {
            setAuthErrors(true)
        }
    }, [errors])

    const signupButton = (e) => {
        e.preventDefault();
        dispatch(signUp(firstName, lastName, email, primaryBank, job, password, confirmPassword, rememberMe))
    }
    const demoButton = (e) => {
        e.preventDefault();
        dispatch(demo());
    }
    const firstNameInput = (e) => {
        setFirstName(e.target.value)
    }
    const lastNameInput = (e) => {
        setLastName(e.target.value)
    }
    const emailInput = (e) => {
        setEmail(e.target.value)
    }
    const primaryBankInput = (e) => {
        setPrimaryBank(e.target.value)
    }
    const jobInput = (e) => {
        setJob(e.target.value)
    }
    const passwordInput = (e) => {
        setPassword(e.target.value)
    }
    const confirmPasswordInput = (e) => {
        setConfirmPassword(e.target.value)
    }
    const clickedRememberMe = () => {
        if (rememberMe === "False") {
            setRememberMe("True")
        } else {
            setRememberMe("False")
        }
    }
    if (props.isLoggedIn) {
        return <Redirect to='/homepage' />;
    }

    const signupErrors = (
        <div className="signupPage__mainDiv">
            <div className="signupPic__Container">
                <img className="signupPic" src={signupPic} alt="signupPic" />
            </div>
            <div className="signupForm__mainDiv">
                <h6 className="signupErrors">{errors}</h6>
                <form className="signupForm">
                    Welcome to E-sential! Where your financial prosperity is essential to us
                    <p className="passwordRequirements">Password MUST have 8 or more characters with at least 1 uppercase letter, 1 number, and 1 symbol</p>
                    <div className="signupForm__row1">
                        <label className="signupForm__label">
                            First Name
                            <input onChange={firstNameInput} className="signupForm__input-row1" value={firstName} name="firstName" type="text" required />
                        </label>
                        <label className="signupForm__label">
                            Last Name
                            <input onChange={lastNameInput} className="signupForm__input-row1" value={lastName} name="lastName" type="text" required />
                        </label>
                        <label className="signupForm__label">
                            Email
                            <input onChange={emailInput} className="signupForm__input-row1" value={email} name="email" type="email" required />
                        </label>
                    </div>
                    <div className="signupForm__row1">
                        <label className="signupForm__label">
                            Job
                            <input onChange={jobInput} className="signupForm__input-row1" value={job} name="job" type="text" required />
                        </label>
                        <label className="signupForm__label">
                            Password
                            {errors === "Password and Confirmed Password must match" || errors === "Please follow Password requirements" ? <input onChange={passwordInput} className="signupForm__input-error" value={password} name="lastName" type="text" required /> : <input onChange={passwordInput} className="signupForm__input-row1" value={password} name="lastName" type="text" required />}
                        </label>
                        <label className="signupForm__label">
                            Confirm Password
                            {errors === "Password and Confirmed Password must match" ? <input onChange={confirmPasswordInput} className="signupForm__input-error" value={confirmPassword} name="email" type="email" required /> : <input onChange={confirmPasswordInput} className="signupForm__input-row1" value={confirmPassword} name="email" type="email" required />}
                        </label>
                    </div>
                    <div className="signupForm__row1">
                        <label className="signupForm__label">
                            Primary Bank
                            <input onChange={primaryBankInput} className="signupForm__input-row1" value={primaryBank} name="firstName" type="text" required />
                        </label>
                    </div>
                    <button onClick={signupButton} type="submit" className="loginButton">Sign Up</button>
                    <button onClick={demoButton} type="submit" className="demoButton">Demo</button>
                    <label style={{ marginTop: "38px" }} className="checkboxContainer">Remember Me
                        <input onClick={clickedRememberMe} type="checkbox" />
                        <span className="checkmark"></span>
                    </label>
                </form>
            </div>
            <div className="signup__bottomDiv"></div>
        </div>
    )

    return (
        <>
        {authErrors === false ? <div className="signupPage__mainDiv">
            <div className="signupPic__Container">
                <img className="signupPic" src={signupPic} alt="signupPic" />
            </div>
            <div className="signupForm__mainDiv">
                <form className="signupForm">
                    Welcome to E-sential! Where your financial prosperity is essential to us
                    <p className="passwordRequirements">Password MUST have 8 or more characters with at least 1 uppercase letter, 1 number, and 1 symbol</p>
                    <div className="signupForm__row1">
                        <label className="signupForm__label">
                            First Name
                            <input onChange={firstNameInput} className="signupForm__input-row1" value={firstName} name="firstName" type="text" required />
                        </label>
                        <label className="signupForm__label">
                            Last Name
                            <input onChange={lastNameInput} className="signupForm__input-row1" value={lastName} name="lastName" type="text" required />
                        </label>
                        <label className="signupForm__label">
                            Email
                            <input onChange={emailInput} className="signupForm__input-row1" value={email} name="email" type="email" required />
                        </label>
                    </div>
                    <div className="signupForm__row1">
                        <label className="signupForm__label">
                            Job
                            <input onChange={jobInput} className="signupForm__input-row1" value={job} name="job" type="text" required />
                        </label>
                        <label className="signupForm__label">
                            Password
                            <input onChange={passwordInput} className="signupForm__input-row1" value={password} name="lastName" type="text" required />
                        </label>
                        <label className="signupForm__label">
                            Confirm Password
                            <input onChange={confirmPasswordInput} className="signupForm__input-row1" value={confirmPassword} name="email" type="email" required />
                        </label>
                    </div>
                    <div className="signupForm__row1">
                        <label className="signupForm__label">
                            Primary Bank
                            <input onChange={primaryBankInput} className="signupForm__input-row1" value={primaryBank} name="firstName" type="text" required />
                        </label>
                    </div>
                    <button onClick={signupButton} type="submit" className="loginButton">Sign Up</button>
                    <button onClick={demoButton} type="submit" className="demoButton">Demo</button>
                    <label style={{ marginTop: "38px" }} className="checkboxContainer">Remember Me
                        <input onClick={clickedRememberMe} type="checkbox" />
                        <span className="checkmark"></span>
                    </label>
                </form>
            </div>
            <div className="signup__bottomDiv"></div>
        </div> : signupErrors}
        </>
    )
}

export default SignUpPage;