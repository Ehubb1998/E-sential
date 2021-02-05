import React from "react";
import { useSelector } from "react-redux";
import Particles from 'react-particles-js';


const StockMarket = () => {
    const portfolio = useSelector(state => state.stockDataReducer.portfolioData);
    const portfolioSet = window.localStorage.getItem("PORTFOLIO_SET");

    const noStocks = (
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
    )
    return (
        <>
        <div className="menuSelection__backgroundDiv">
            <div className="menuSelection__mainDiv">
                {portfolioSet === "true" ? <div className="inner__mainDiv">
                    TEST
                </div> : noStocks}
            </div>
        </div>
        </>
    )
}

export default StockMarket;