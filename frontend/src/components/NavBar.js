import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../logo.png";

const NavBar = (props) => {
    const [searchInput, setSearchInput] = useState("");

    const searchBox = (e) => {
        setSearchInput(e.target.value)
    }
    const logout = (e) => {
        e.preventDefault();
        window.localStorage.clear();
        window.location.href = "/";
    }

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
    let loggedIn = (
        <nav role="navigation" className="navBar">
            <NavLink to="/homepage" className="logo">
                <img src={Logo} alt="logo" height="44px" />
            </NavLink>
            <div className="searchWrap">
                <form action="index.php" method="post">
                    <span className="searchIcon"></span>
                    <input onChange={searchBox} type="text" name="subject" className="instaSearch" value={searchInput} placeholder="Search" />
                </form>
            </div>
            <a onClick={logout} className="navBar__authDiv-login" href="/">Logout</a>

        </nav>
    )
    return (
        <>
            {!props.isLoggedIn ? notLoggedIn : loggedIn}
        </>
    )
}

export default NavBar;