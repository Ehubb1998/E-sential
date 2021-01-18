import React, { useState } from 'react';
import splashPageImg1 from "../assets/splashPage-1.png";
import splashPageImg2 from "../assets/splashPage-img2.jpeg";
import splashPageImg3 from "../assets/splashPage-img3.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

const SplashPage = (props) => {
    const [overGithub, setOverGithub] = useState(false);
    const [overLinkedIn, setOverLinkedIn] = useState(false);

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
                        <a href="https://ehubb1998.github.io/Ehubb/" className="credits__name">Elijah Hubbard</a>
                        <a onMouseEnter={overGitHub} onMouseLeave={leftGitHub} href="https://github.com/Ehubb1998" className="credits__github">
                            {overGithub === false ? <FontAwesomeIcon icon={faGithub} color="white" /> : <FontAwesomeIcon icon={faGithub} color="green" />}
                        </a>
                        <a onMouseEnter={overLinked} onMouseLeave={leftLinked} href="https://www.linkedin.com/in/elijah-h-090a2518b/" className="credits__github">
                            {overLinkedIn === false ? <FontAwesomeIcon icon={faLinkedinIn} color="white" /> : <FontAwesomeIcon icon={faLinkedinIn} color="green" />}
                        </a>
                    </div>
                    <p className="footer__info">© E-sential. All rights reserved.</p>
                    <p className="footer__info2">RISK DISCLOSURE! This app is strictly for educational purposes. This is not a real time stock trading brokerage</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default SplashPage;