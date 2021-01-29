import React from "react";
import Particles from 'react-particles-js';


const StockMarket = () => {
    return (
        <>
        <div className="menuSelection__backgroundDiv">
            <div className="menuSelection__mainDiv">
                <div style={{ position: "relative" }} className="inner__mainDiv">
                    <Particles
                        className='particles'
                        height="520px"
                        params={{
                            particles: {
                                color: {
                                    value: 'rgb(0, 200, 5)',
                                },
                                number: {
                                    value: 50,
                                },
                                size: {
                                    value: 4,
                                },
                            },
                            interactivity: {
                                events: {
                                    onhover: {
                                        enable: true,
                                        mode: 'repulse',
                                    },
                                },
                            },
                        }}
                    />
                    <div className="buyStockDiv">Buy Stocks to see portfolio</div>
                </div>
            </div>
        </div>
        </>
    )
}

export default StockMarket;