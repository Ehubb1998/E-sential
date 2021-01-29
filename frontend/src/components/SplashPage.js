import React, { useState } from 'react';
import { NavLink, Redirect } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { clearErrors } from "../store/actions/auth";
import splashPageImg1 from "../assets/splashPage-1.png";
import splashPageImg2 from "../assets/splashPage-img2.jpeg";
import splashPageImg3 from "../assets/splashPage-img3.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn, faAngellist } from "@fortawesome/free-brands-svg-icons";

const SplashPage = (props) => {
    const dispatch = useDispatch();
    const [overGithub, setOverGithub] = useState(false);
    const [overLinkedIn, setOverLinkedIn] = useState(false);
    const [overAngel, setOverAngel] = useState(false);

    (function () {
        dispatch(clearErrors())
    })();
    const overGitHub = () => {
        setOverGithub(true)
    }
    const leftGitHub = () => {
        setOverGithub(false)
    }
    const overLinked = () => {
        setOverLinkedIn(true)
    }
    const leftLinked = () => {
        setOverLinkedIn(false)
    }
    const overAngelIcon = () => {
        setOverAngel(true)
    }
    const leftAngel= () => {
        setOverAngel(false)
    }
    if (props.isLoggedIn) {
        return <Redirect to='/homepage' />;
    }

    return (
        <>
        <div className="splashPage__backgroundDiv">
            <div className="splashPage__mainDiv">
                <div className="splashPage__divContainer-image">
                    <img src={splashPageImg3} className="splashPage__img1" alt="learn" />
                </div>
                <div className="splashPage__divContainer-image">
                    <img src={splashPageImg2} className="splashPage__img1" alt="learn" />
                </div>
                <div className="splashPage__divContainer-image">
                    <img src={splashPageImg1} className="splashPage__img1" alt="learn" />
                </div>
                <div className="splashPage__footer">
                    <div className="footer__credits">
                        <div className="credits__container">
                            <a href="https://ehubb1998.github.io/Ehubb/" className="credits__name">Elijah Hubbard</a>
                            <a onMouseEnter={overGitHub} onMouseLeave={leftGitHub} href="https://github.com/Ehubb1998" className="credits__github">
                                {overGithub === false ? <FontAwesomeIcon icon={faGithub} color="white" /> : <FontAwesomeIcon icon={faGithub} color="green" />}
                            </a>
                            <a onMouseEnter={overLinked} onMouseLeave={leftLinked} href="https://www.linkedin.com/in/elijah-h-090a2518b/" className="credits__github">
                                {overLinkedIn === false ? <FontAwesomeIcon icon={faLinkedinIn} color="white" /> : <FontAwesomeIcon icon={faLinkedinIn} color="green" />}
                            </a>
                            <a onMouseEnter={overAngelIcon} onMouseLeave={leftAngel} href="https://angel.co/u/elijah-hubbard" className="credits__github">
                                {overAngel === false ? <FontAwesomeIcon icon={faAngellist} color="white" /> : <FontAwesomeIcon icon={faAngellist} color="green" />}
                            </a>
                        </div>
                    </div>
                    <p className="footer__info">© E-sential. All rights reserved.</p>
                    <p className="footer__info2">RISK DISCLOSURE! This app is strictly for educational purposes. This is not a real time stock trading brokerage</p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <NavLink style={{ marginLeft: "" }} className="imageCredits" to="/credits">Content Credits</NavLink>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default SplashPage;