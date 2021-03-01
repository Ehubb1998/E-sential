import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePlan } from "../../../store/actions/stockInfo";
import NoStocks from "./NoStocks";
import { finishedLoading } from "../../../store/actions/stockInfo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const Plans = () => {
    const dispatch = useDispatch();
    window.localStorage.removeItem("component");
    const token = window.localStorage.getItem("ESENTIAL_ACCESS_TOKEN");
    const userId = window.localStorage.getItem("ESENTIAL_USER_ID");
    const plansRedux = useSelector(state => state.stockDataReducer.plans);

    const [editPlans, setEditPlans] = useState(false);
    const [plansArr, setPlansArr] = useState([]);
    const [noPlans, setNoPlans] = useState(false);

    const editPlansFunc = () => {
        if (editPlans) {
            setEditPlans(false);
        } else {
            setEditPlans(true);
        }
    }
    const deletePlanFunc = (planId) => {
        console.log("IN DELETE PLAN FUNC")
        dispatch(deletePlan(userId, planId, token));
    }

    useEffect(() => {
        dispatch(finishedLoading(false));
        if (plansRedux && plansRedux.length > 0) {
            setPlansArr(plansRedux);
        } else {
            setNoPlans(true);
        }
        // eslint-disable-next-line
    }, [plansRedux])

    const loadingWheel = (
        <div id="loader">
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    );

    return (
        <>
            {noPlans === false ? <div className="stockContent__div">
                <div className="portfolio__totalValue-container">
                    <div style={{ display: "flex", justifyContent: "flex-start" }} className="totalValue__div">
                        <div className="totalValue">Plans</div>
                        <div style={{ width: "11%" }} className="buttonDiv">
                            <span>Create a plan</span>
                        </div>
                        <div onClick={editPlansFunc} className="buttonDiv">
                            <span>{editPlans ? "Done" : "Edit"}</span>
                        </div>
                    </div>
                </div>
                <div className="totalValue__bottomBorder"></div>
                <div className="stockChart">
                    {plansArr.length > 0 ? plansArr.map((plan) => (
                        <div key={plan.id} className="plan__container">
                            {editPlans ? <div onClick={() => deletePlanFunc(plan.id)} style={{ position: "unset", display: "inline-block", paddingLeft: "1%", paddingTop: "1%" }} className="xButton__div">
                                <FontAwesomeIcon icon={faTimesCircle} size="2x" />
                            </div> : <></>}
                            <div className={editPlans ? "plan__title-xButton" : "plan__title"}>{plan.name}</div>
                            <div className="planTitle__borderBottom">
                                <div className="borderBottom__title"></div>
                            </div>
                            <div className="planDetails__div">
                                <div className="planRow1">
                                    <span style={{ paddingLeft: "13%" }}>Job: {plan.job}</span>
                                    <span>Stock: {plan.stock.toUpperCase()}</span>
                                </div>
                                <div className="planRow2">
                                    <span>Monthly Income: ${plan.monthlyIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                    <span>Amount To Save: ${plan.amountToSave.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                    <span>Target Amount To Invest: ${plan.targetAmountToInvest.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                </div>
                            </div>
                        </div>
                    )) : loadingWheel}
                </div>
            </div> : <NoStocks tab="plans" />}
        </>
    )
}

export default Plans;