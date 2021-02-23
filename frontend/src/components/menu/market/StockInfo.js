import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { LineChart, Line, Tooltip, YAxis, ResponsiveContainer } from 'recharts';
import { backButton, buyStock } from "../../../store/actions/stockInfo";
import { updateBalance } from "../../../store/actions/bankInfo";

const StockInfo = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const stockProp = props.stock;
    const stockURL = props.stockURL;
    const [stock, setStock] = useState({});
    const [loading, setLoading] = useState(true);
    const [timeSelection, setTimeSelection] = useState("today");
    const [numShares, setNumShares] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const bankBalance = useSelector(state => state.bankDataReducer.bankData.accountBalance);
    const token = window.localStorage.getItem("ESENTIAL_ACCESS_TOKEN");
    const userId = window.localStorage.getItem("ESENTIAL_USER_ID");

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
    const amountOfShares = (e) => {
        setNumShares(e.target.value);
        const total = stock.currentPPS * e.target.value;
        setTotalAmount(total);
    }
    const placeOrder = () => {
        dispatch(buyStock(userId, token, stock.symbol, numShares, stock.currentPPS));
        const newBalance = Number(bankBalance) - totalAmount;
        dispatch(updateBalance(userId, token, newBalance));
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

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    });

    const loadingWheel = (
        <div style={{ marginTop: "0px", marginBottom: "28%" }} id="loader">
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    );

    if (loading) return loadingWheel;
    return (
        <>
        <div style={{ height: "51vh" }} className="individualStocks__portfolio">
            <div style={{ width: "60%" }}>
                <span onClick={backButtonFunc} className="backButton">&lt; Back</span>
                <div style={{ marginTop: "2%" }} className="stockName__portfolio">{stock.company}</div>
                <ResponsiveContainer height="74%">
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
            </div>
            <div className="stockInfo__portfolio-div">
                <div className="stockInfo__name">
                    <span>{stock.symbol}</span>
                    <span>{formatter.format(stock.currentPPS)}</span>
                </div>
                <div className="buyStocks__container">
                    <div className="amountOfShares__container">
                        <div className="amountOfShares__alignText"><span>Amount</span></div>
                        <div className="amountOfShares__div">
                            <input onChange={amountOfShares} className="amountOfShares__input" value={numShares} type="number" />
                            <div className="amountOfShares__alignText"><span>Shares</span></div>
                        </div>
                    </div>
                    <div className="estimatedAmount__container">
                        <span>Total</span>
                        <span>{formatter.format(totalAmount)}</span>
                    </div>
                    <div className="amountOfShares__bottomBorder"></div>
                </div>
                <p>{formatter.format(bankBalance)} Buying Power Available</p>
                <button onClick={placeOrder} className="placeOrderButton">Place Order</button>
            </div>
        </div>
        </>
    )
}

export default StockInfo;