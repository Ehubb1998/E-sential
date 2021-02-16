import React from "react";
import NoStocks from "./NoStocks";

const Plans = () => {
    window.localStorage.removeItem("component");
    return (
        <>
        {/* <div style={{ fontSize: "18px" }}>Plans</div> */}
        <NoStocks tab="plans" />
        </>
    )
}

export default Plans;