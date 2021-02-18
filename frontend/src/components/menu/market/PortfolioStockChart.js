import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { LineChart, Line, Tooltip, YAxis, ResponsiveContainer } from 'recharts';
import { portfolioStockCharts, finishedLoading } from "../../../store/actions/stockInfo";

const PortfolioStockChart = (props) => {
    const dispatch = useDispatch();
    const portfolioStock = props.stock;
    const portfolioLength = props.portfolioLength;
    const memory = props.memory
    const [stockChart, setStockChart] = useState({});
    const [timeSelection, setTimeSelection] = useState("today");
    const [loading, setLoading] = useState(true);
    const token = window.localStorage.getItem("ESENTIAL_ACCESS_TOKEN");

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

    const stockApi = async (timeFrame, nameOfStock) => {
        const chartRequests = await fetch(`/api/stock_info/chart/${timeFrame}/${token}/${nameOfStock}`);
        if (timeFrame === "company") {
            const { CompanyInfo } = await chartRequests.json();
            return CompanyInfo
        }
        const { StockChart } = await chartRequests.json();
        const half = Math.ceil(StockChart.length / 2);
        const rightHalf = StockChart.splice(half, StockChart.length - 1);
        return rightHalf;
    }

    const individualStockData = async (stock, timeFrame) => {
        const stockName = stock.stock;
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
        return stockChart;
    }

    useEffect(() => {
        const stockFunction = async () => {
            if (memory && loading) {
                setStockChart(portfolioStock);
                setLoading(false);
                const count = window.localStorage.getItem("count");
                const num = Number(count);
                if (num !== portfolioLength - 1) {
                    window.localStorage.setItem("count", `${num + 1}`);
                } else {
                    window.localStorage.setItem("done", "true");
                    dispatch(finishedLoading(true));
                }
                return;
            }
            if (loading) {
                const stockData = await individualStockData(portfolioStock, timeSelection);
                setStockChart(stockData);
                setLoading(false);
                const count = window.localStorage.getItem("count");
                const num = Number(count);
                if (num !== portfolioLength - 1) {
                    window.localStorage.setItem("count", `${num + 1}`);
                    dispatch(portfolioStockCharts(stockData));
                } else {
                    dispatch(finishedLoading(true));
                    dispatch(portfolioStockCharts(stockData));
                }
            }
        }
        stockFunction();
        // eslint-disable-next-line
    }, [timeSelection]);

    const numberFormat = (num) => {
        let roundedNum = Math.round(num);
        let formattedNum = roundedNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return formattedNum;
    }

    if (loading) return <></>
    return (
        <>
        <div className="individualStocks__portfolio">
            <div className="stockChart__div">
                <div className="stockName__portfolio">{stockChart.company}</div>
                <ResponsiveContainer height="78%">
                    <LineChart data={stockChart} margin={{top:25, bottom: 25}}>
                        <Line type="linear" dataKey="close" stroke="#00c805" dot={false} strokeWidth={2} isAnimationActive={true} />
                        <YAxis hide={true} domain={[dataMin => (Math.round(dataMin)), dataMax => (Math.round(dataMax))]} />
                        <Tooltip isAnimationActive={false} offset={-40} position={{ y: -40 }} />
                    </LineChart>
                </ResponsiveContainer>
                <div className="stockChart__timeFrame">
                    {timeSelection === "today" ? <div style={{ marginLeft: "0px" }} id="today" className="timeFrames selected__timeFrame">1D</div> : <div onClick={todaySelection} style={{ marginLeft: "0px" }} className="timeFrames">1D</div>}
                    {timeSelection === "week" ? <div id="week" className="timeFrames selected__timeFrame">1W</div> : <div onClick={weekSelection} className="timeFrames">1W</div>}
                    {timeSelection === "month" ? <div id="month" className="timeFrames selected__timeFrame">1M</div> : <div onClick={monthSelection} className="timeFrames">1M</div>}
                    {timeSelection === "6months" ? <div id="6months" className="timeFrames selected__timeFrame">6M</div> : <div onClick={sixMonthsSelection} className="timeFrames">6M</div>}
                    {timeSelection === "year" ? <div id="year" className="timeFrames selected__timeFrame">1Y</div> : <div onClick={yearSelection} className="timeFrames">1Y</div>}
                </div>
            </div>
            <div className="stockInfo__portfolio-div">
                <div className="stockInfo__name">
                    <span>{stockChart.symbol}</span>
                    <span>${numberFormat(stockChart.currentPPS)}</span>
                </div>
                <div className="stockInfo__shares-div">
                    <div className="totalValue__portfolio">
                        <span>Total Value</span>
                        <span>${numberFormat(stockChart.totalValue)}</span>
                    </div>
                    <div className="yourShares">
                        <span>{stockChart.numShares} Shares</span>
                        <span>@${numberFormat(stockChart.purchasedPPS)}/share</span>
                    </div>
                    <div className="totalDifference__portfolio">
                        {stockChart.difference > stockChart.totalValue ? <span className="profit__difference">+ ${numberFormat(stockChart.difference)}</span> : <span className="lost__difference">- ${numberFormat(stockChart.difference)}</span>}
                    </div>
                </div>
            </div>
        </div>
        <div style={{ height: "10%", backgroundColor: "white" }}></div>
        </>
    )
}

export default PortfolioStockChart;