import React from "react";
import { useDispatch } from "react-redux";
import { LineChart, Line, YAxis, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { deleteFromWL } from "../../../store/actions/stockInfo";

const MiniStockData = (props) => {
    const dispatch = useDispatch();
    let miniStock;
    const removeStockFromWL = props.removeStockFromWL;
    const miniStocks = props.stockArray
    if (props.watchList) {
        miniStock = props.stock;
    } else {
        miniStock = miniStocks[props.i];
    }
    // const watchLater = props.watchLater;
    const editWatchList = props.editWatchList;

    const removeFromWL = () => {
        dispatch(deleteFromWL(props.userId, props.token, miniStock.symbol.toLowerCase(), miniStocks, props.i));
        removeStockFromWL(props.i);
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    });

    // console.log(overStock)
    // removeFromWL(miniStock.symbol)
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