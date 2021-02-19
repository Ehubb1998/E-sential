import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Banking from "./menu/Banking";
import StockMarket from "./menu/StockMarket";
import Account from "./menu/Account";

const Homepage = (props) => {
    const history = useHistory();
    const [menuSelection, setMenuSelection] = useState("banking");
    let urlStockInfo = false;
    const stockInfo = props.stock;
    const component = window.localStorage.getItem("component");
    let subComponent = false;
    if (stockInfo) {
        urlStockInfo = true;
    }
    if (component === "portfolio" || component === "market" || component === "watchList" || component === "plans") {
        subComponent = true;
    } 


    const bankingSelection = () => {
        setMenuSelection("banking");
        if (stockInfo) {
            history.replace("/homepage");
            window.localStorage.setItem("component", "banking");
        }
    }
    const stockSelection = () => {
        setMenuSelection("stock");
        // if (stockInfo) {
        //     history.replace("/homepage");
        //     window.localStorage.setItem("component", "stock");
        // }
    }
    const accountSelection = () => {
        setMenuSelection("account");
        if (stockInfo) {
            history.replace("/homepage");
            window.localStorage.setItem("component", "account");
        }
    }

    return (
        <>
        <div className="homepage__mainMenuDiv">
            {(menuSelection === "banking" && urlStockInfo === false && !component) || component === "banking" ? <div onClick={bankingSelection} className="bankingInfo__menu selected"><span>Banking</span></div> : <div onClick={bankingSelection} className="bankingInfo__menu"><span>Banking</span></div>}
            {menuSelection === "stock" || urlStockInfo === true || component === "stock" || subComponent === true ? <div onClick={stockSelection} className="stockMarket__menu selected"><span>Stock Market</span></div> : <div onClick={stockSelection} className="stockMarket__menu"><span>Stock Market</span></div>}
            {menuSelection === "account" || component === "account" ? <div onClick={accountSelection} className="userAccount__menu selected"><span>Account</span></div> : <div onClick={accountSelection} className="userAccount__menu"><span>Account</span></div>}
        </div>
        {menuSelection === "stock" || urlStockInfo === true || component === "stock" || subComponent === true ? <StockMarket component={component} stock={stockInfo} /> : menuSelection === "account" || component === "account" ? <Account /> : <Banking />}
        </>
    )
}

export default Homepage;