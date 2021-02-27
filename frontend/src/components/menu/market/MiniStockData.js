import React from "react";
import { useDispatch } from "react-redux";
import { watchList } from "../../../store/actions/stockInfo";
import { LineChart, Line, YAxis, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const MiniStockData = (props) => {
    const dispatch = useDispatch();
    const miniStocks = props.stockArray
    const miniStock = miniStocks[props.i];
    // const watchLater = props.watchLater;
    const editWatchList = props.editWatchList;

    const token = window.localStorage.getItem("ESENTIAL_ACCESS_TOKEN");
    const userId = window.localStorage.getItem("ESENTIAL_USER_ID");

    const removeFromWL = async () => {
        const stockName = miniStock.symbol;
        try {
            const removeStock = await fetch("/api/watch_list/", {
                method: "DELETE",
                body: JSON.stringify({ userId: userId, stockName: stockName.toLowerCase(), token: token }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const { WatchList } = await removeStock.json();
            dispatch(watchList(WatchList));
        } catch (err) {
            console.error(err);
        }
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    });

    // console.log(overStock)
    return (
        <div className="miniStockChart__container">
            {editWatchList ? <div onClick={removeFromWL} className="xButton__div">
                <FontAwesomeIcon icon={faTimesCircle} size="lg" />
            </div> : <></>}
            <ResponsiveContainer height="60%" width="92%">
                <LineChart data={miniStock}>
                    <YAxis hide={true} domain={[dataMin => (Math.round(dataMin)), dataMax => (Math.round(dataMax))]} />
                    <Line type="linear" dataKey="close" stroke="#00c805" dot={false} strokeWidth={1} />
                </LineChart>
            </ResponsiveContainer>
            <div className="miniStocksInfo__container">
                <div className="miniStockName">{miniStock.symbol}</div>
                <div className="miniStockPPS">{formatter.format(miniStock.currentPPS)}</div>
            </div>
        </div>
    )
}

export default MiniStockData;