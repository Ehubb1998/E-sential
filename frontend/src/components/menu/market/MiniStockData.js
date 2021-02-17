import React from "react";
import { LineChart, Line, YAxis, ResponsiveContainer } from 'recharts';

const MiniStockData = (props) => {
    const miniStocks = props.stockArray
    const miniStock = miniStocks[props.i];

    return (
        <div className="miniStockChart__container">
            <ResponsiveContainer height="60%" width="80%">
                <LineChart data={miniStock}>
                    <YAxis hide={true} domain={[dataMin => (Math.round(dataMin)), dataMax => (Math.round(dataMax))]} />
                    <Line type="linear" dataKey="close" stroke="#00c805" dot={false} strokeWidth={1} />
                </LineChart>
            </ResponsiveContainer>
            <div className="miniStocksInfo__container">
                <div className="miniStockName">{miniStock.symbol}</div>
                <div className="miniStockPPS">${miniStock.currentPPS}</div>
            </div>
        </div>
    )
}

export default MiniStockData;