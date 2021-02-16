import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { LineChart, Line, Tooltip, YAxis, ResponsiveContainer } from 'recharts';
// import NoStocks from "./NoStocks";

const Portfolio = () => {
    window.localStorage.removeItem("component");
    const portfolio = useSelector(state => state.stockDataReducer.portfolioData);
    const [portfolioTotalValue, setPortfolioTotalValue] = useState("");
    const [totalValueDifference, setTotalValueDifference] = useState("");
    const [differenceStatus, setDifferenceStatus] = useState("");
    const total = window.localStorage.getItem("TOTAL");
    const token = window.localStorage.getItem("ESENTIAL_ACCESS_TOKEN");
    // const portfolioSet = window.localStorage.getItem("PORTFOLIO_SET");
    const [timeSelection, setTimeSelection] = useState("today");
    const [loading, setLoading] = useState(true);
    const [stockCharts, setStockCharts] = useState([]);
    // const ref = useRef([]);
    // let stockCharts = ref.current;


    const todaySelection = () => {
        setTimeSelection("today");
    }
    const weekSelection = () => {
        setTimeSelection("week");
    }
    const monthSelection = () => {
        setTimeSelection("month");
    }
    const sixMonthsSelection = () => {
        setTimeSelection("6months");
    }
    const yearSelection = () => {
        setTimeSelection("year");
    }

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

    const stockApi = async (timeFrame, nameOfStock) => {
        const chartRequests = await fetch(`/api/stock_info/chart/${timeFrame}/${token}/${nameOfStock}`);
        if (timeFrame === "company") {
            const { CompanyInfo } = await chartRequests.json();
            return CompanyInfo
        }
        const { StockChart } = await chartRequests.json();
        return StockChart;
    }

    const individualStockData = async (portfolioArray, timeFrame) => {
        let stockDataArray = [];
        for (let i = 0; i < portfolioArray.length; i++) {
            let stock = portfolioArray[i];
            let stockName = stock.stock;

            const stockChart = await stockApi(timeFrame, stockName);
            const companyInfo = await stockApi("company", stockName);

            stockChart["company"] = companyInfo.companyName;
            stockChart["symbol"] = companyInfo.symbol;
            stockChart["purchasedPPS"] = stock.pps;
            stockChart["numShares"] = stock.shares;
            let lastObj = stockChart[stockChart.length - 1];
            let currentPPS = lastObj.close;
            stockChart["currentPPS"] = currentPPS;
            stockChart["totalValue"] = stockChart.purchasedPPS * stockChart.numShares;
            stockChart["difference"] = stockChart.numShares * stockChart.currentPPS;
            stockDataArray.push(stockChart);
        }
        // debugger;
        return stockDataArray;
        // console.log(stockCharts);
    }

    const numberFormat = (num) => {
        let roundedNum = Math.round(num);
        let formattedNum = roundedNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return formattedNum;
    }

    useEffect(() => {
        const stockFunction = async () => {
            if (loading === true) {
                totalValue(portfolio);
                const stockData = await individualStockData(portfolio, timeSelection);
                // console.log(stockData);
                setStockCharts(stockData);
                setLoading(false);
            }
        }
        stockFunction();
    }, []);


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
        <div id="loader">
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    );

    // const testData = [{name: "Elijah", high: 1000, low: 900}, {name: "Hubbard", high: 800, low: 700}, {name: "Shamar", high: 600, low: 500}, {name: "Test", high: 400, low: 300}];

    return (
        <>
        <div className="stockContent__div">
            <div className="portfolio__totalValue-container">
                <div className="totalValue__div">
                    {portfolio && portfolioTotalValue ? <div className="totalValue">Portfolio Value • <span style={{ fontWeigth: "400" }}>${portfolioTotalValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></div> : <></>}
                    <div className="differenceInValue__div">
                        <div style={{ paddingTop: "5px" }}>
                            {portfolio && differenceStatus === "up" ? greenArrow : redArrow}
                        </div>
                        {portfolio && totalValueDifference ? <div className="differenceNumber">${totalValueDifference.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div> : <></>}
                    </div>
                </div>
            </div>
            <div className="totalValue__bottomBorder"></div>
            <div className="stockChart">
                {loading === false ? stockCharts.map((chart) => (
                    <span key={chart.company}>
                        <div className="individualStocks__portfolio">
                            <div className="stockChart__div">
                                <div className="stockName__portfolio">{chart.company}</div>
                                <ResponsiveContainer height="78%">
                                    <LineChart data={chart} margin={{top:25, bottom: 25}}>
                                        <Line type="linear" dataKey="close" stroke="#00c805" dot={false} strokeWidth={2} isAnimationActive={true} />
                                        <YAxis hide={true} domain={[dataMin => (Math.round(dataMin)), dataMax => (Math.round(dataMax))]} />
                                        <Tooltip isAnimationActive={false} offset={-40} position={{ y: -40 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                                <div className="stockChart__timeFrame">
                                    {timeSelection === "today" ? <div style={{ marginLeft: "0px" }} className="timeFrames selected__timeFrame">1D</div> : <div onClick={todaySelection} style={{ marginLeft: "0px" }} id="timeFrame__today" className="timeFrames">1D</div>}
                                    {timeSelection === "week" ? <div className="timeFrames selected__timeFrame">1W</div> : <div onClick={weekSelection} id="timeFrame__week" className="timeFrames">1W</div>}
                                    {timeSelection === "month" ? <div className="timeFrames selected__timeFrame">1M</div> : <div onClick={monthSelection} id="timeFrame__month" className="timeFrames">1M</div>}
                                    {timeSelection === "6months" ? <div className="timeFrames selected__timeFrame">6M</div> : <div onClick={sixMonthsSelection} id="timeFrame__6months" className="timeFrames">6M</div>}
                                    {timeSelection === "year" ? <div className="timeFrames selected__timeFrame">1Y</div> : <div onClick={yearSelection} id="timeFrame__year" className="timeFrames">1Y</div>}
                                </div>
                            </div>
                            <div className="stockInfo__portfolio-div">
                                <div className="stockInfo__name">
                                    <span>{chart.symbol}</span>
                                    <span>${numberFormat(chart.currentPPS)}</span>
                                </div>
                                <div className="stockInfo__shares-div">
                                    <div className="totalValue__portfolio">
                                        <span>Total Value</span>
                                        <span>${numberFormat(chart.totalValue)}</span>
                                    </div>
                                    <div className="yourShares">
                                        <span>{chart.numShares} Shares</span>
                                        <span>@${numberFormat(chart.purchasedPPS)}/share</span>
                                    </div>
                                    <div className="totalDifference__portfolio">
                                        {chart.difference > chart.totalValue ? <span className="profit__difference">+ ${numberFormat(chart.difference)}</span> : <span className="lost__difference">- ${numberFormat(chart.difference)}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ height: "10%", backgroundColor: "white" }}></div>
                    </span>
                )) : loadingWheel}
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