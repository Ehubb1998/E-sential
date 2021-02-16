import React, { useState } from "react";
import Banking from "./menu/Banking";
import StockMarket from "./menu/StockMarket";
import Account from "./menu/Account";

const Homepage = (props) => {
    const [menuSelection, setMenuSelection] = useState("banking");
    const stockInfo = props.stock;


    const bankingSelection = () => {
        setMenuSelection("banking");
    }
    const stockSelection = () => {
        setMenuSelection("stock");
    }
    const accountSelection = () => {
        setMenuSelection("account");
    }

    return (
        <>
        <div className="homepage__mainMenuDiv">
            {menuSelection === "banking" ? <div onClick={bankingSelection} className="bankingInfo__menu selected">Banking</div> : <div onClick={bankingSelection} className="bankingInfo__menu">Banking</div>}
            {menuSelection === "stock" ? <div onClick={stockSelection} className="stockMarket__menu selected">Stock Market</div> : <div onClick={stockSelection} className="stockMarket__menu">Stock Market</div>}
            {menuSelection === "account" ? <div onClick={accountSelection} className="userAccount__menu selected">Account</div> : <div onClick={accountSelection} className="userAccount__menu">Account</div>}
        </div>
        {menuSelection === "stock" || stockInfo === true ? <StockMarket stock={stockInfo} /> : menuSelection === "account" ? <Account /> : <Banking />}
        </>
    )
}

export default Homepage;