import React, { useState } from "react";
import Market from "./market/Market";
import Plans from "./market/Plans";
import Portfolio from "./market/Portfolio";
import WatchList from "./market/WatchList";


const StockMarket = (props) => {
    const [menuSelection, setMenuSelection] = useState("portfolio");
    const stockInfo = props.stock;


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
                {menuSelection === "market" || stockInfo === true ? <Market /> : menuSelection === "watchList" ? <WatchList /> : menuSelection === "plans" ? <Plans /> : <Portfolio />}
            </div>
        </div>
        </>
    )
}

export default StockMarket;