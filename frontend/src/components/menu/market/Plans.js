import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import NoStocks from "./NoStocks";
import { finishedLoading } from "../../../store/actions/stockInfo";

const Plans = () => {
    const dispatch = useDispatch();
    window.localStorage.removeItem("component");

    useEffect(() => {
        dispatch(finishedLoading(false));
        // eslint-disable-next-line
    }, [])
    return (
        <>
        {/* <div style={{ fontSize: "18px" }}>Plans</div> */}
        <NoStocks tab="plans" />
        </>
    )
}

export default Plans;