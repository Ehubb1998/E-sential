import React from "react";

const Market = () => {
    const featuredCount = 9;
    const featuredStocks = ["SNAP", "AAPL", "TWTR", "TSLA", "NFLX", "FB", "MSFT", "DIS", "GPRO", "SBUX", "GME", "UBER"];
    return (
        <>
        <div className="stockContent__div">
            <div className="portfolio__totalValue-container">
                <div className="totalValue__div">
                    <div className="totalValue">Featured Stocks</div>
                </div>
            </div>
            <div className="totalValue__bottomBorder"></div>
            <div style={{ height: "200%" }} className="stockChart">
                <div className="featuredStocks__container">
                    {featuredStocks.map(() => (
                        <div className="featuredStocks__div"></div>
                    ))}
                </div>
                {/* <div style={{ backgroundColor: "grey", height: "5vh" }}></div> */}
                {/* <div style={{ height: "3%", backgroundColor: "white" }}></div> */}
            </div>
        </div>
        </>
    )
}

export default Market;