import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import NoStocks from "./NoStocks";
import { finishedLoading } from "../../../store/actions/stockInfo";

const WatchList = () => {
    const dispatch = useDispatch();
    window.localStorage.removeItem("component");

    useEffect(() => {
        dispatch(finishedLoading(false));
        // eslint-disable-next-line
    }, []);

    return (
        <>
        {/* <div style={{ fontSize: "18px" }}>Watch List</div> */}
        <NoStocks tab="watchList" />
        </>
    )
}

export default WatchList;