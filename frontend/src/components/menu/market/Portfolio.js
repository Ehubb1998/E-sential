import React from "react";
import NoStocks from "./NoStocks";

const Portfolio = () => {
    // const portfolio = useSelector(state => state.stockDataReducer.portfolioData);
    // const portfolioSet = window.localStorage.getItem("PORTFOLIO_SET");

    return (
        <>
        {/* <div style={{ fontSize: "18px" }}>Portfolio</div> */}
        <NoStocks tab="portfolio" />
        </>
    )
}

// For reference
// {portfolioSet === "true" ? <div className="inner__mainDiv">
//     TEST
// </div> : noStocks}

export default Portfolio;