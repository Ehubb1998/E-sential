import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import MiniStockData from "./MiniStockData";
import NoStocks from "./NoStocks";
import { finishedLoading, watchList } from "../../../store/actions/stockInfo";

const WatchList = () => {
    const dispatch = useDispatch();
    window.localStorage.removeItem("component");

    const [loading, setLoading] = useState(true);
    const [watchListState, setWatchListState] = useState([]);
    const [editWatchList, setEditWatchList] = useState(false);
    const [noStocks, setNoStocks] = useState(false);
    const watchListRedux = useSelector(state => state.stockDataReducer.watchList);
    const token = window.localStorage.getItem("ESENTIAL_ACCESS_TOKEN");
    const userId = window.localStorage.getItem("ESENTIAL_USER_ID");

    const editWatchListFunc = () => {
        if (editWatchList) {
            setEditWatchList(false);
        } else {
            setEditWatchList(true);
        }
    }

    const removeStockFromWL = (index) => {
        let newWatchList = watchListState;
        newWatchList.splice(index, 1);
        setWatchListState(newWatchList);
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
        const featuredStocksFunc = async () => {
            if (loading === true) {
                const watchListApi = await fetch(`/api/watch_list/list/${userId}/${token}`);
                const { WatchList } = await watchListApi.json();
                if (WatchList) {
                    const stockData = await featuredStockData(WatchList, "today");
                    setWatchListState(stockData)
                    dispatch(watchList(stockData));
                } else {
                    setNoStocks(true);
                }
                setLoading(false);
            } else {
                if (watchListRedux && watchListRedux.length > 0) {
                    setWatchListState(watchListRedux);
                } else {
                    setNoStocks(true);
                }
            }
        }
        featuredStocksFunc();
        // eslint-disable-next-line
    }, [watchListRedux]);

    const loadingWheel = (
        <div id="loader">
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    );

    return (
        <>
        {noStocks === false ? <div className="stockContent__div">
            <div className="portfolio__totalValue-container">
                <div style={{ display: "flex", justifyContent: "flex-start" }} className="totalValue__div">
                    <div className="totalValue">Watch List</div>
                    <div onClick={editWatchListFunc} className="buttonDiv">
                        <span>{editWatchList ? "Done" : "Edit"}</span>
                    </div>
                </div>
            </div>
            <div className="totalValue__bottomBorder"></div>
            <div className="stockChart">
                {console.log("This the watchListState")}
                {console.log(watchListState)}
                {loading === false ? <div className="featuredStocks__container">
                    {watchListState.map((stock) => (
                        <div key={watchListState.indexOf(stock)} className="featuredStocks__div hvr-grow"><MiniStockData i={watchListState.indexOf(stock)} userId={userId} token={token} editWatchList={editWatchList} stock={stock} watchList={true} stockArray={watchListState} removeStockFromWL={removeStockFromWL} /></div>
                    ))}
                </div> : loadingWheel}
            </div>
        </div> : <NoStocks tab="watchList" />}
        </>
    )
}

export default WatchList;