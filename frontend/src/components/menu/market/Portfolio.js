import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PortfolioStockChart from "./PortfolioStockChart";
// import { portfolioStockCharts } from "../../../store/actions/stockInfo";
// import NoStocks from "./NoStocks";

const Portfolio = () => {
    window.localStorage.removeItem("component");
    // const dispatch = useDispatch();
    const portfolio = useSelector(state => state.stockDataReducer.portfolioData);
    const finishedLoading = useSelector(state => state.stockDataReducer.finishedLoading);
    // const portfolioStockChartsRedux = useSelector(state => state.stockDataReducer.portfolioStockCharts);
    const [portfolioTotalValue, setPortfolioTotalValue] = useState(0);
    const [totalValueDifference, setTotalValueDifference] = useState("");
    const [differenceStatus, setDifferenceStatus] = useState("");
    const total = window.localStorage.getItem("TOTAL");
    // const portfolioSet = window.localStorage.getItem("PORTFOLIO_SET");
    const [loading, setLoading] = useState(true);
    // const stockChartsArray = [];

    const totalDifference = (num) => {
        console.log("INSIDE OF TOTALDIFFERENCE FUNCTION");
        const newNum = Number(total);
        if (!newNum) {
            setTotalValueDifference("0");
            setDifferenceStatus("up");
        }
        if (num > newNum) {
            let newTotal = num - newNum;
            setTotalValueDifference(newTotal);
            setDifferenceStatus("up");
        }
        if (num < newNum) {
            let newTotal = newNum - num;
            setTotalValueDifference(newTotal);
        }
        if (num === newNum) {
            setTotalValueDifference("0");
            setDifferenceStatus("up");
        }
    }

    const totalValue = (portfolioData) => {
        console.log("INSIDE OF TOTALVALUE FUNCTION");
        const newValueArr = [];
        const differenceArr = [];
        let newValue = 0;
        let difference = 0;
        portfolioData.forEach((obj) => {
            newValueArr.push(obj.newValue);
            differenceArr.push(obj.difference);
        });
        for (let i = 0; i < portfolioData.length; i++) {
            let newValueNum = newValueArr[i];
            let differenceNum = differenceArr[i];
            newValue =+ newValueNum;
            difference =+ differenceNum;
        }
        setPortfolioTotalValue(newValue);
        // debugger;
        totalDifference(difference);
        window.localStorage.setItem("TOTAL", newValue);
    }

    useEffect(() => {
        const stockFunction = async () => {
            // const grabStockCharts = () => {
            //     if (window.localStorage.getItem("done") === "true") {
            //         // window.localStorage.removeItem("done");
            //         setLoading(false);
            //     } else {
            //         for (let i = 1; i <= portfolio.length; i++) {
            //             const stockChart = window.localStorage.getItem(`portfolioStockChart${i}`);
            //             const parsedChart = JSON.parse(stockChart);
            //             stockChartsArray.push(parsedChart);
            //             window.localStorage.removeItem(`portfolioStockChart${i}`);
            //         }
            //         if (stockChartsArray.length > 0) {
            //             setLoading(false);
            //             dispatch(portfolioStockCharts(stockChartsArray));
            //             window.localStorage.removeItem("count");
            //             debugger;
            //         }
            //     }
            // }
            if (finishedLoading) {
                // grabStockCharts();
            if (portfolioTotalValue !== 0) {
                const totalValueArray = [];
                for (let i = 1; i <= portfolio.length; i++) {
                    const newValue = window.localStorage.getItem(`newValue${i}`);
                    const difference = window.localStorage.getItem(`differences${i}`);
                    const totalValueObj = {};
                    totalValueObj["newValue"] = newValue;
                    totalValueObj["difference"] = difference;
                    totalValueArray.push(totalValueObj);
                    debugger;
                    window.localStorage.removeItem(`newValue${i}`);
                    window.localStorage.removeItem(`differences${i}`);
                    console.log("INSIDE OF FOR LOOP");
                }
                totalValue(totalValueArray);
            }
                setLoading(false);
                window.localStorage.removeItem("count");
            }
        }
        stockFunction();
        // eslint-disable-next-line
    }, [finishedLoading]);


    const greenArrow = (
        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="rgb(0, 200, 5)" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
            <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
        </svg>
    );
    const redArrow = (
        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
            <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
        </svg>
    );
    const loadingWheel = (
        <div style={{ zIndex: "4" }} id="loader">
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    );
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    });

    // const testData = [{name: "Elijah", high: 1000, low: 900}, {name: "Hubbard", high: 800, low: 700}, {name: "Shamar", high: 600, low: 500}, {name: "Test", high: 400, low: 300}];

    return (
        <>
        <div className="stockContent__div">
            <div className="portfolio__totalValue-container">
                <div className="totalValue__div">
                    {portfolio && loading === false ? <div className="totalValue">Portfolio Value • <span style={{ fontWeigth: "400" }}>{formatter.format(portfolioTotalValue)}</span></div> : <></>}
                    <div className="differenceInValue__div">
                        <div style={{ paddingTop: "5px" }}>
                            {portfolio && loading === false && differenceStatus === "up" ? greenArrow : redArrow}
                        </div>
                        {portfolio && totalValueDifference ? <div className="differenceNumber">{formatter.format(totalValueDifference)}</div> : <></>}
                    </div>
                </div>
            </div>
            <div className="totalValue__bottomBorder"></div>
            <div className="stockChart">
                {loading ? loadingWheel : <></>}
                {portfolio ? portfolio.map((stock) => (
                    <PortfolioStockChart key={stock.id} stock={stock} portfolioLength={portfolio.length} />
                )) : <></>}
                {/* {portfolio && finishedLoading === false ? portfolio.map((stock) => (
                    <PortfolioStockChart key={stock.id} stock={stock} portfolioLength={portfolio.length} />
                )) : portfolio && finishedLoading && portfolioStockChartsRedux ? portfolioStockChartsRedux.map((stock) => <PortfolioStockChart key={stock[stock.length - 1].id} stock={stock} portfolioLength={portfolio.length} memory={true} />) : <></>} */}
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