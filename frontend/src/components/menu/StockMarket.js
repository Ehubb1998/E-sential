import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Market from "./market/Market";
import Plans from "./market/Plans";
import Portfolio from "./market/Portfolio";
import WatchList from "./market/WatchList";


const StockMarket = (props) => {
    const history = useHistory();
    const [menuSelection, setMenuSelection] = useState("portfolio");
    let urlStockInfo = false;
    const stockInfo = props.stock;
    let component = props.component;
    if (stockInfo) {
        urlStockInfo = true;
    }
    if (urlStockInfo === false) {
        component = "";
    }


    const portfolioSelection = () => {
        setMenuSelection("portfolio");
        if (stockInfo) {
            history.replace("/homepage");
            window.localStorage.setItem("component", "portfolio");
        }
    }
    const marketSelection = () => {
        setMenuSelection("market");
        if (stockInfo) {
            history.replace("/homepage");
            window.localStorage.setItem("component", "market");
        }
    }
    const watchListSelection = () => {
        setMenuSelection("watchList");
        if (stockInfo) {
            history.replace("/homepage");
            window.localStorage.setItem("component", "watchList");
        }
    }
    const plansSelection = () => {
        setMenuSelection("plans");
        if (stockInfo) {
            history.replace("/homepage");
            window.localStorage.setItem("component", "plans");
        }
    }

    return (
        <>
        <div className="menuSelection__backgroundDiv">
            <div className="menuSelection__mainDiv">
                <div className="stockMarket__navDiv">
                    {(menuSelection === "portfolio" && urlStockInfo === false) || component === "portfolio" ? <div className="portfolio__component stockMarket__selected">Portfolio</div> : <div onClick={portfolioSelection} className="portfolio__component">Portfolio</div>}
                    {menuSelection === "market" || urlStockInfo === true ? <div className="market__component stockMarket__selected">Market</div> : <div onClick={marketSelection} className="market__component">Market</div>}
                    {menuSelection === "watchList" || component === "watchList" ? <div className="watchList__component stockMarket__selected">Watch List</div> : <div onClick={watchListSelection} className="watchList__component">Watch List</div>}
                    {menuSelection === "plans" || component === "plans" ? <div className="plans__component stockMarket__selected">Plans</div> : <div onClick={plansSelection} className="plans__component">Plans</div>}
                </div>
                {menuSelection === "market" || urlStockInfo === true || component === "market" ? <Market stock={stockInfo} /> : menuSelection === "watchList" || component === "watchList" ? <WatchList /> : menuSelection === "plans" || component === "plans" ? <Plans /> : <Portfolio />}
            </div>
        </div>
        </>
    )
}

export default StockMarket;