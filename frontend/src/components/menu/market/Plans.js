import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// import NoStocks from "./NoStocks";
import { finishedLoading } from "../../../store/actions/stockInfo";

const Plans = () => {
    const dispatch = useDispatch();
    window.localStorage.removeItem("component");

    useEffect(() => {
        dispatch(finishedLoading(false));
        // eslint-disable-next-line
    }, [])

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
                        <div className="totalValue">Plans</div>
                    </div>
                </div>
                <div className="totalValue__bottomBorder"></div>
                <div className="stockChart">
                    <div className="plan__container">
                        <div className="plan__title">Apple Stock</div>
                        <div className="planTitle__borderBottom">
                            <div className="borderBottom__title"></div>
                        </div>
                        <div className="planDetails__div">
                            <div className="planRow1">
                                <span style={{ paddingLeft: "13%" }}>Job: Dominoes</span>
                                <span>Stock: Apple</span>
                            </div>
                            <div className="planRow2">
                                <span>Monthly Income: $3000</span>
                                <span>Amount To Save: $250</span>
                                <span>Target Amount To Invest: $800</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Plans;
/* <NoStocks tab="plans" /> */