import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import signupPic from "../../assets/signupPic.jpeg"
import { signUp, demo } from "../../store/actions/auth";
import { addBankData } from "../../store/actions/bankInfo";

const SignUpPage = (props) => {
    const dispatch = useDispatch();
    const errors = useSelector(state => state.auth.msg);
    const token = useSelector(state => state.auth.token);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [job, setJob] = useState("");
    const [primaryBank, setPrimaryBank] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [authErrors, setAuthErrors] = useState(false);
    const [rememberMe, setRememberMe] = useState("False");
    const [signUpSuccessful, setSignUpSuccessful] = useState(false);
    const [balance, setBalance] = useState("");
    const [monthlyIncome, setMonthlyIncome] = useState("");
    const [bankInfoErrors, setBankInfoErrors] = useState(false);

    useEffect(() => {
        if (errors) {
            setAuthErrors(true)
        }
        if (token) {
            setSignUpSuccessful(true);
        }
    }, [errors, token])

    const signupButton = (e) => {
        e.preventDefault();
        if (primaryBank === "") {
            dispatch(signUp(firstName, lastName, email, "Wells Fargo", job, password, confirmPassword, rememberMe));
            return;
        }
        dispatch(signUp(firstName, lastName, email, primaryBank, job, password, confirmPassword, rememberMe));
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
    const balanceInput = (e) => {
        setBalance(e.target.value);
    }
    const monthlyInput = (e) => {
        setMonthlyIncome(e.target.value);
    }
    const bankInfoButton = (e) => {
        e.preventDefault();
        if (balance === "" || monthlyIncome === "") {
            setBankInfoErrors(true);
            console.log("Inside error statement")
            return;
        }
        const userId = window.localStorage.getItem("ESENTIAL_USER_ID");
        const token = window.localStorage.getItem("ESENTIAL_ACCESS_TOKEN");
        dispatch(addBankData(userId, token, balance, monthlyIncome));
    }
    if (props.isLoggedIn) {
        return <Redirect to='/homepage' />;
    }

    const addBankInfo = (
        <div className="signupPage__mainDiv">
            <div className="bankInfo__container">
                <div className="bankInfo__box">
                    <div className="bankInfo__title">Bank Information</div>
                    <div className="bankInfo__balanceDiv">
                        <p style={{ margin: "0px", fontSize: "13px", marginLeft: "150px", marginTop: "7px", color: "red", fontWeight: "600" }}>DO NOT USE the "," symbol!!</p>
                        <label className="bankInfo__balanceInput">
                            Balance
                            {bankInfoErrors ? <input onChange={balanceInput} className="bankInfo__errors" value={balance} name="balance" type="text" required /> : <input onChange={balanceInput} className="signupForm__input-row1" value={balance} name="balance" type="text" required />}
                        </label>
                        <label className="bankInfo__balanceInput">
                            Monthly Income
                            {bankInfoErrors ? <input onChange={monthlyInput} className="bankInfo__errors" value={monthlyIncome} name="balance" type="text" required /> : <input onChange={monthlyInput} className="signupForm__input-row1" value={monthlyIncome} name="balance" type="text" required />}
                        </label>
                        <button onClick={bankInfoButton} style={{ marginTop: "10px", marginLeft: "170px" }} className="loginButton">Continue</button>
                    </div>
                </div>
            </div>
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
                            {errors === "Password and Confirmed Password must match" || errors === "Please follow Password requirements" ? <input onChange={passwordInput} className="signupForm__input-error" value={password} name="password" type="password" required /> : <input onChange={passwordInput} className="signupForm__input-row1" value={password} name="password" type="password" required />}
                        </label>
                        <label className="signupForm__label">
                            Confirm Password
                            {errors === "Password and Confirmed Password must match" ? <input onChange={confirmPasswordInput} className="signupForm__input-error" value={confirmPassword} name="confirmPassword" type="password" required /> : <input onChange={confirmPasswordInput} className="signupForm__input-row1" value={confirmPassword} name="confirmPassword" type="password" required />}
                        </label>
                    </div>
                    <div className="signupForm__row1">
                        <label className="signupForm__label">
                            Primary Bank
                            {/* <input onChange={primaryBankInput} className="signupForm__input-row1" value={primaryBank} name="primaryBank" type="text" required /> */}
                            <select onChange={primaryBankInput} className="signupForm__select">
                                <option value="Wells Fargo">Wells Fargo</option>
                                <option value="Bank of America">Bank of America</option>
                                <option value="Capital One">Capital One</option>
                                <option value="Chase">Chase</option>
                                <option value="Citi Bank">Citi Bank</option>
                                <option value="Fifth Third Bank">Fifth Third Bank</option>
                                <option value="PNC Bank">PNC Bank</option>
                                <option value="Truist">Truist</option>
                            </select>
                        </label>
                    </div>
                    <button onClick={signupButton} type="submit" className="signUpButton">Sign Up</button>
                    {/* <button onClick={demoButton} className="signUpDemo">Demo</button> */}
                    <label style={{ marginTop: "3.6%", fontSize: "1em", marginLeft: "15%", paddingLeft: "3.5%" }} className="checkboxContainer">Remember Me
                        <input onClick={clickedRememberMe} type="checkbox" />
                        <span style={{ marginTop: "0.7%" }} className="checkmark"></span>
                    </label>
                </form>
            </div>
            <div className="signup__bottomDiv"></div>
        </div>
    )

    return (
        <>
        {signUpSuccessful === false ? <div className="signupPage__mainDiv">
            <div className="signupPic__Container">
                <img className="signupPic" src={signupPic} alt="signupPic" />
            </div>
            <div className="signupForm__mainDiv">
                {authErrors ? <h6 className="signupErrors">{errors}</h6> : <></>}
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
                            <input onChange={passwordInput} className="signupForm__input-row1" value={password} name="password" type="password" required />
                        </label>
                        <label className="signupForm__label">
                            Confirm Password
                            <input onChange={confirmPasswordInput} className="signupForm__input-row1" value={confirmPassword} name="confirmPassword" type="password" required />
                        </label>
                    </div>
                    <div className="signupForm__row1">
                        <label className="signupForm__label">
                            Primary Bank
                            {/* <input onChange={primaryBankInput} className="signupForm__input-row1" value={primaryBank} name="primaryBank" type="text" required /> */}
                            <select onChange={primaryBankInput} className="signupForm__select">
                                <option value="Wells Fargo">Wells Fargo</option>
                                <option value="Bank of America">Bank of America</option>
                                <option value="Capital One">Capital One</option>
                                <option value="Chase">Chase</option>
                                <option value="Citi Bank">Citi Bank</option>
                                <option value="Fifth Third Bank">Fifth Third Bank</option>
                                <option value="PNC Bank">PNC Bank</option>
                                <option value="Truist">Truist</option>
                            </select>
                        </label>
                    </div>
                    <button onClick={signupButton} type="submit" className="signUpButton">Sign Up</button>
                    {/* <button onClick={demoButton} className="signUpDemo">Demo</button> */}
                    <label style={{ marginTop: "3.6%", fontSize: "1em", marginLeft: "15%", paddingLeft: "3.5%" }} className="checkboxContainer">Remember Me
                        <input onClick={clickedRememberMe} type="checkbox" />
                        <span style={{ marginTop: "0.7%" }} className="checkmark"></span>
                    </label>
                </form>
            </div>
            <div className="signup__bottomDiv"></div>
        </div> : addBankInfo}
        </>
    )
}

export default SignUpPage;