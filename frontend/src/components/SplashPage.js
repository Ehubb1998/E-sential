import React from 'react';
import splashPageImg1 from "../splashPage-1.png";

const SplashPage = () => {
    return (
        <>
        <div className="splashPage__backgroundDiv">
            <div className="splashPage__mainDiv">
                <div className="splashPage__divContainer-image">
                    <img src={splashPageImg1} className="splashPage__img1" alt="learn" />
                </div>
            </div>
        </div>
        </>
    )
}

export default SplashPage;