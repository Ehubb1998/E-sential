import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LineChart, Line, Tooltip, YAxis, ResponsiveContainer } from 'recharts';
import { finishedLoading } from "../../../store/actions/stockInfo";

const PortfolioStockChart = (props) => {
    const dispatch = useDispatch();
    const portfolioStock = props.stock;
    const finishedLoadingRedux = useSelector(state => state.stockDataReducer.finishedLoading);
    const portfolioLength = props.portfolioLength;
    const [stockChart, setStockChart] = useState({});
    const [companyInfo, setCompanyInfo] = useState({});
    const [timeSelection, setTimeSelection] = useState("today");
    const [previousTime, setPreviousTime] = useState("");
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

        const companyInfoObj = {};
        companyInfoObj["company"] = companyInfo.companyName;
        companyInfoObj["symbol"] = companyInfo.symbol;
        companyInfoObj["purchasedPPS"] = stock.pps;
        companyInfoObj["numShares"] = stock.shares;
        let lastObj = stockChart[stockChart.length - 1];
        // debugger;
        let currentPPS = lastObj.close;
        companyInfoObj["currentPPS"] = currentPPS;
        companyInfoObj["totalValue"] = companyInfoObj.purchasedPPS * companyInfoObj.numShares;
        const newValue = companyInfoObj.numShares * companyInfoObj.currentPPS
        companyInfoObj["newValue"] = newValue;

        if (newValue > companyInfoObj.totalValue) {
            companyInfoObj["difference"] = newValue - companyInfoObj.totalValue;
        } 
        if (newValue < companyInfoObj.totalValue) {
            companyInfoObj["difference"] = companyInfoObj.totalValue - newValue;
        }
        if (newValue === companyInfoObj.totalValue) {
            companyInfoObj["difference"] = 0;
        }
        stockChart.unshift(companyInfoObj);
        return stockChart;
    }

    useEffect(() => {
        const stockFunction = async () => {
            if (loading || timeSelection !== previousTime) {
                if (timeSelection !== previousTime && finishedLoadingRedux) {
                    if (previousTime === "") {
                        const stockData = await individualStockData(portfolioStock, timeSelection);
                        const stockCharts = stockData;
                        const companyInfoProps = stockCharts.shift();
                        setStockChart(stockCharts);
                        setCompanyInfo(companyInfoProps);
                        setLoading(false);
                        const count = window.localStorage.getItem("count");
                        const num = Number(count);

                        if (num !== portfolioLength - 1) {
                            window.localStorage.setItem("count", `${num + 1}`);
                            window.localStorage.setItem(`newValue${num + 1}`, `${companyInfoProps.newValue}`);
                            window.localStorage.setItem(`totalValue${num + 1}`, `${companyInfoProps.totalValue}`);
                        } else {
                            window.localStorage.setItem(`newValue${num + 1}`, `${companyInfoProps.newValue}`);
                            window.localStorage.setItem(`totalValue${num + 1}`, `${companyInfoProps.totalValue}`);
                            dispatch(finishedLoading(true));
                        }
                    } else {
                        const stockData = await individualStockData(portfolioStock, timeSelection);
                        const stockCharts = stockData;
                        const companyInfoProps = stockCharts.shift();
                        setStockChart(stockCharts);
                        setCompanyInfo(companyInfoProps);
                        setLoading(false);
                    }
                } else {
                    const stockData = await individualStockData(portfolioStock, timeSelection);
                    const stockCharts = stockData;
                    const companyInfoProps = stockCharts.shift();
                    setStockChart(stockCharts);
                    setCompanyInfo(companyInfoProps);
                    setLoading(false);
                    const count = window.localStorage.getItem("count");
                    const num = Number(count);

                    if (num !== portfolioLength - 1) {
                        window.localStorage.setItem("count", `${num + 1}`);
                        window.localStorage.setItem(`newValue${num + 1}`, `${companyInfoProps.newValue}`);
                        window.localStorage.setItem(`totalValue${num + 1}`, `${companyInfoProps.totalValue}`);
                    } else {
                        window.localStorage.setItem(`newValue${num + 1}`, `${companyInfoProps.newValue}`);
                        window.localStorage.setItem(`totalValue${num + 1}`, `${companyInfoProps.totalValue}`);
                        dispatch(finishedLoading(true));
                    }
                }
            }
            setPreviousTime(timeSelection);
        }
        stockFunction();
        // eslint-disable-next-line
    }, [timeSelection]);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    });

    if (loading) return <></>
    return (
        <>
        <div className="individualStocks__portfolio">
            <div className="stockChart__div">
                <div className="stockName__portfolio">{companyInfo.company}</div>
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
                    <span>{companyInfo.symbol}</span>
                    <span>{formatter.format(companyInfo.currentPPS)}</span>
                </div>
                <div className="stockInfo__shares-div">
                    <div className="totalValue__portfolio">
                        <span>Total Value</span>
                        <span>{formatter.format(companyInfo.newValue)}</span>
                    </div>
                    <div className="yourShares">
                        <span>{companyInfo.numShares} Shares</span>
                        <span>@{formatter.format(companyInfo.purchasedPPS)}/share</span>
                    </div>
                    <div className="totalDifference__portfolio">
                        {companyInfo.newValue > companyInfo.totalValue || companyInfo.newValue === companyInfo.totalValue ? <span className="profit__difference">+ {formatter.format(companyInfo.difference)}</span> : <span className="lost__difference">- {formatter.format(companyInfo.difference)}</span>}
                    </div>
                </div>
            </div>
        </div>
        <div style={{ height: "10%", backgroundColor: "white" }}></div>
        </>
    )
}

export default PortfolioStockChart;