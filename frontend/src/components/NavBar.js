import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../logo.png";

const NavBar = (props) => {
    const [authorized, setAuthorized] = useState(props.isLoggedIn)

    let notLoggedIn = (
        <nav role="navigation" className="navBar">
            <NavLink to="/" className="logo">
                <img src={Logo} alt="logo" height="44px" />
            </NavLink>
            <div className="navBar__authDiv">
                <NavLink to="/login" className="navBar__authDiv-login">Log In</NavLink>
                <NavLink to="/signup" className="navBar__authDiv-signup">Sign Up</NavLink>
            </div>
        </nav>
    )
    // let loggedIn = (

    // )
    return (
        <>
            {!props.isLoggedIn ? notLoggedIn : <></>}
        </>
    )
}

export default NavBar;