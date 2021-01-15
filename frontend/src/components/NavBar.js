import React from 'react';
import Logo from "../logo.png";

const NavBar = () => {
    return (
        <>
        <nav role="navigation" className="navBar">
            <a href="/" className="logo">
                <img src={Logo} alt="logo" height="44px" />
            </a>
        </nav>
        </>
    )
}

export default NavBar;