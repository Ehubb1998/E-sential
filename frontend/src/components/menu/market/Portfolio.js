import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import Green from "../../../assets/green.svg";
// import Red from "../../../assets/red.svg";
// import NoStocks from "./NoStocks";

const Portfolio = () => {
    const portfolio = useSelector(state => state.stockDataReducer.portfolioData);
    const [portfolioTotalValue, setPortfolioTotalValue] = useState("");
    const [totalValueDifference, setTotalValueDifference] = useState("");
    const [differenceStatus, setDifferenceStatus] = useState("");
    const total = window.localStorage.getItem("TOTAL");
    // const portfolioSet = window.localStorage.getItem("PORTFOLIO_SET");

    const totalDifference = (num) => {
        if (!total) {
            setTotalValueDifference("0");
            setDifferenceStatus("up")
        }
        if (num > total) {
            let newTotal = num - total;
            setTotalValueDifference(newTotal);
            setDifferenceStatus("up");
        }
        if (num < total) {
            let newTotal = total - num;
            setTotalValueDifference(newTotal);
            setDifferenceStatus("up");
        }
        if (num === total) {
            setTotalValueDifference("0");
            setDifferenceStatus("up")
        }
    }

    const totalValue = (portfolioData) => {
        let portfolioValues = [];
        let totalValue = 0;
        portfolioData.forEach((stock) => {
            let shares = stock.shares;
            let pps = stock.pps;
            let total = shares * pps;
            portfolioValues.push(total);
        });
        portfolioValues.forEach((num) => {
            totalValue += num;
        });
        setPortfolioTotalValue(totalValue);
        totalDifference(totalValue);
        window.localStorage.setItem("TOTAL", totalValue);
    }

    useEffect(() => {
        totalValue(portfolio)
    })

    return (
        <>
        <div className="stockContent__div">
            <div className="portfolio__totalValue-container">
                <div className="totalValue__div">
                    {portfolio && portfolioTotalValue ? <div className="totalValue">Total Value • <span style={{ fontWeigth: "400" }}>${portfolioTotalValue}</span></div> : <></>}
                    <div className="differenceInValue__div">
                        {/* {differenceStatus === "up" ? <div className="differenceSymbol__up"><Green /></div> : <div className="differenceSymbol__down"><Red /></div>} */}
                        {portfolio && totalValueDifference ? <div className="differenceNumber">${totalValueDifference}</div> : <></>}
                    </div>
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

/* <NoStocks tab="portfolio" /> */

export default Portfolio;