import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import NoStocks from "./NoStocks";

const Portfolio = () => {
    const portfolio = useSelector(state => state.stockDataReducer.portfolioData);
    const [portfolioTotalValue, setPortfolioTotalValue] = useState("");
    const [totalValueDifference, setTotalValueDifference] = useState("");
    const [differenceStatus, setDifferenceStatus] = useState("");
    const total = window.localStorage.getItem("TOTAL");
    // const portfolioSet = window.localStorage.getItem("PORTFOLIO_SET");

    const totalDifference = (num) => {
        const newNum = num.toString();
        if (!total) {
            setTotalValueDifference("0");
            setDifferenceStatus("up");
        }
        if (newNum > total) {
            let newTotal = newNum - total;
            setTotalValueDifference(newTotal);
            setDifferenceStatus("up");
        }
        if (newNum < total) {
            let newTotal = total - newNum;
            setTotalValueDifference(newTotal);
        }
        if (newNum === total) {
            setTotalValueDifference("0");
            setDifferenceStatus("up");
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
    });

    const greenArrow = (
        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="rgb(0, 200, 5)" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
            <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
        </svg>
    );
    const redArrow = (
        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
            <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
        </svg>
    )

    return (
        <>
        <div className="stockContent__div">
            <div className="portfolio__totalValue-container">
                <div className="totalValue__div">
                    {portfolio && portfolioTotalValue ? <div className="totalValue">Total Value • <span style={{ fontWeigth: "400" }}>${portfolioTotalValue}</span></div> : <></>}
                    <div className="differenceInValue__div">
                        <div style={{ paddingTop: "5px" }}>
                            {portfolio && differenceStatus === "up" ? greenArrow : redArrow}
                        </div>
                        {portfolio && totalValueDifference ? <div className="differenceNumber">${totalValueDifference}</div> : <></>}
                    </div>
                </div>
            </div>
            <div className="totalValue__bottomBorder"></div>
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