import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { LineChart, Line, Tooltip, YAxis, ResponsiveContainer } from 'recharts';
import { backButton } from "../../../store/actions/stockInfo";

const StockInfo = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const stockProp = props.stock;
    const stockURL = props.stockURL;
    const [stock, setStock] = useState({});
    const [loading, setLoading] = useState(true);
    const [timeSelection, setTimeSelection] = useState("today");
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
    const backButtonFunc = () => {
        dispatch(backButton(true));
        if (stockURL) {
            history.replace("/homepage");
            window.localStorage.setItem("component", "market");
            window.localStorage.setItem("back", "true");
        }
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

    const individualStockData = async (stockName, timeFrame) => {
        const stockChart = await stockApi(timeFrame, stockName);
        const companyInfo = await stockApi("company", stockName);

        stockChart["company"] = companyInfo.companyName;
        stockChart["symbol"] = companyInfo.symbol;
        let lastObj = stockChart[stockChart.length - 1];
        let currentPPS = lastObj.close;
        stockChart["currentPPS"] = currentPPS;
        return stockChart;
    }

    useEffect(() => {
        const stockFunction = async () => {
            if (loading === true) {
                const stockData = await individualStockData(stockProp, timeSelection);
                setStock(stockData);
                setLoading(false);
            }
        }
        stockFunction();
        // eslint-disable-next-line
    }, []);

    const numberFormat = (num) => {
        let roundedNum = Math.round(num);
        let formattedNum = roundedNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return formattedNum;
    }

    const loadingWheel = (
        <div id="loader">
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    );
    
    return (
        <>
        <div className="individualStocks__portfolio">
            <div className="stockChart__div">
                <span onClick={backButtonFunc} style={{ paddingBottom: "2%" }} className="backButton">&lt; Back</span>
                <div className="stockName__portfolio">{stock.company}</div>
                {loading === false ? <div>
                    <ResponsiveContainer height="78%">
                        <LineChart data={stock} margin={{top:25, bottom: 25}}>
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
                </div> : loadingWheel}
            </div>
            <div className="stockInfo__portfolio-div">
                <div className="stockInfo__name">
                    <span>{stock.symbol}</span>
                    <span>${numberFormat(stock.currentPPS)}</span>
                </div>
                <div className="stockInfo__shares-div">
                    {/* <div className="totalValue__portfolio">
                        <span>Total Value</span>
                        <span>${numberFormat(chart.totalValue)}</span>
                    </div>
                    <div className="yourShares">
                        <span>{chart.numShares} Shares</span>
                        <span>@${numberFormat(chart.purchasedPPS)}/share</span>
                    </div>
                    <div className="totalDifference__portfolio">
                        {chart.difference > chart.totalValue ? <span className="profit__difference">+ ${numberFormat(chart.difference)}</span> : <span className="lost__difference">- ${numberFormat(chart.difference)}</span>}
                    </div> */}
                </div>
            </div>
        </div>
        </>
    )
}

export default StockInfo;