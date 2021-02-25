import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import MiniStockData from "./MiniStockData";
// import NoStocks from "./NoStocks";
import { finishedLoading, backButton } from "../../../store/actions/stockInfo";

const WatchList = () => {
    const dispatch = useDispatch();
    window.localStorage.removeItem("component");

    const backButtonRedux = useSelector(state => state.stockDataReducer.backButton);
    const [inExpanded, setInExpanded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [miniStocks, setMiniStocks] = useState([]);
    const [watchList, setWatchList] = useState([]);
    const token = window.localStorage.getItem("ESENTIAL_ACCESS_TOKEN");
    const userId = window.localStorage.getItem("ESENTIAL_USER_ID");

    const stockApi = async (timeFrame, nameOfStock) => {
        const chartRequests = await fetch(`/api/stock_info/chart/${timeFrame}/${token}/${nameOfStock}`);
        if (timeFrame === "company") {
            const { CompanyInfo } = await chartRequests.json();
            return CompanyInfo
        }
        const { StockChart } = await chartRequests.json();
        const half = Math.ceil(StockChart.length / 2);
        const rightHalf = StockChart.splice(half, StockChart.length - 1);
        const halfOfRight = Math.ceil(rightHalf.length / 2);
        const rightOfHalf = rightHalf.splice(halfOfRight, StockChart.length - 1);
        return rightOfHalf;
    }

    const featuredStockData = async (stockArray, timeFrame) => {
        let stockDataArray = [];
        for (let i = 0; i < stockArray.length; i++) {
            let stock = stockArray[i];

            const stockChart = await stockApi(timeFrame, stock);
            const companyInfo = await stockApi("company", stock);

            stockChart["company"] = companyInfo.companyName;
            stockChart["symbol"] = companyInfo.symbol;
            let lastObj = stockChart[stockChart.length - 1];
            let currentPPS = lastObj.close;
            stockChart["currentPPS"] = currentPPS;
            stockDataArray.push(stockChart);
        }
        return stockDataArray;
    }

    useEffect(() => {
        dispatch(finishedLoading(false))
        if (backButtonRedux === true) {
            setInExpanded(false);
            dispatch(backButton(false));
        }
        const featuredStocksFunc = async () => {
            if (loading === true) {
                const watchListApi = await fetch(`/api/watch_list/list/${userId}/${token}`);
                const { WatchList } = await watchListApi.json();
                const stockData = await featuredStockData(WatchList, "today");
                setWatchList(WatchList)
                setMiniStocks(stockData);
                setLoading(false);
            }
        }
        featuredStocksFunc();
        // eslint-disable-next-line
    }, [backButtonRedux]);

    const loadingWheel = (
        <div id="loader">
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    );

    return (
        <>
        <div className="stockContent__div">
            <div className="portfolio__totalValue-container">
                <div className="totalValue__div">
                    <div className="totalValue">Watch List</div>
                </div>
            </div>
            <div className="totalValue__bottomBorder"></div>
            <div style={loading === false && inExpanded === false ? {} : { height: "67%" }} className="stockChart">
                {loading === false && inExpanded === false ? <div className="featuredStocks__container">
                    <div className="featuredStocks__row">
                        {watchList.map((stock) => (
                            <div id={watchList.indexOf(stock)} className="featuredStocks__div hvr-grow"><MiniStockData i={watchList.indexOf(stock)} stockArray={miniStocks} /></div>
                        ))}
                    </div>
                    <div style={{ height: "5vh" }}></div>
                </div> : loadingWheel}
            </div>
        </div>
        </>
    )
}

export default WatchList;

/* <NoStocks tab="watchList" /> */