import React, { useState } from "react";
import { useSelector } from "react-redux";
import Particles from 'react-particles-js';


const StockMarket = () => {
    const portfolio = useSelector(state => state.stockDataReducer.portfolioData);
    const portfolioSet = window.localStorage.getItem("PORTFOLIO_SET");
    const [menuSelection, setMenuSelection] = useState("portfolio");


    const portfolioSelection = () => {
        setMenuSelection("portfolio");
    }
    const marketSelection = () => {
        setMenuSelection("market");
    }
    const watchListSelection = () => {
        setMenuSelection("watchList");
    }
    const plansSelection = () => {
        setMenuSelection("plans");
    }

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
                <div className="stockMarket__navDiv">
                    {menuSelection === "portfolio" ? <div className="portfolio__component stockMarket__selected">Portfolio</div> : <div onClick={portfolioSelection} className="portfolio__component">Portfolio</div>}
                    {menuSelection === "market" ? <div className="market__component stockMarket__selected">Market</div> : <div onClick={marketSelection} className="market__component">Market</div>}
                    {menuSelection === "watchList" ? <div className="watchList__component stockMarket__selected">Watch List</div> : <div onClick={watchListSelection} className="watchList__component">Watch List</div>}
                    {menuSelection === "plans" ? <div className="plans__component stockMarket__selected">Plans</div> : <div onClick={plansSelection} className="plans__component">Plans</div>}
                </div>
            </div>
        </div>
        </>
    )
}

// For reference
// {portfolioSet === "true" ? <div className="inner__mainDiv">
//     TEST
// </div> : noStocks}

export default StockMarket;