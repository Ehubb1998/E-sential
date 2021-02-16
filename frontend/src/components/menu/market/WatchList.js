import React from 'react';
import NoStocks from "./NoStocks";

const WatchList = () => {
    window.localStorage.removeItem("component");
    return (
        <>
        {/* <div style={{ fontSize: "18px" }}>Watch List</div> */}
        <NoStocks tab="watchList" />
        </>
    )
}

export default WatchList;