import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePlan, createPlan } from "../../../store/actions/stockInfo";
import NoStocks from "./NoStocks";
import { finishedLoading } from "../../../store/actions/stockInfo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faTimes } from "@fortawesome/free-solid-svg-icons";

const Plans = () => {
    const dispatch = useDispatch();
    window.localStorage.removeItem("component");
    const token = window.localStorage.getItem("ESENTIAL_ACCESS_TOKEN");
    const userId = window.localStorage.getItem("ESENTIAL_USER_ID");
    const plansRedux = useSelector(state => state.stockDataReducer.plans);

    const [editPlans, setEditPlans] = useState(false);
    const [plansArr, setPlansArr] = useState([]);
    const [noPlans, setNoPlans] = useState(false);
    const [createPlanState, setCreatePlanState] = useState(false);
    const [planName, setPlanName] = useState("");
    const [job, setJob] = useState("");
    const [monthlyIncome, setMonthlyIncome] = useState("");
    const [stockName, setStockName] = useState("");
    const [amountToSave, setAmountToSave] = useState("");
    const [targetAmount, setTargetAmount] = useState("");

    const setPlanFunc = (e) => {
        setPlanName(e.target.value);
    }
    const setJobFunc = (e) => {
        setJob(e.target.value);
    }
    const setMonthlyFunc = (e) => {
        setMonthlyIncome(e.target.value);
    }
    const setStockFunc = (e) => {
        setStockName(e.target.value);
    }
    const setAmount = (e) => {
        setAmountToSave(e.target.value);
    }
    const setTarget = (e) => {
        setTargetAmount(e.target.value);
    }

    const editPlansFunc = () => {
        if (editPlans) {
            setEditPlans(false);
        } else {
            setEditPlans(true);
        }
    }
    const deletePlanFunc = (planId) => {
        dispatch(deletePlan(userId, planId, token));
    }
    const createPlanFunc = () => {
        if (createPlanState) {
            setCreatePlanState(false);
        } else {
            setCreatePlanState(true);
        }
    }
    const submitPlan = () => {
        dispatch(createPlan(userId, token, planName, job, monthlyIncome, stockName, amountToSave, targetAmount));
        setCreatePlanState(false);
        setPlanName("");
        setJob("");
        setMonthlyIncome("");
        setStockName("");
        setAmountToSave("");
        setTargetAmount("");
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

    const createPlanJSX = (
        <div className="stockContent__div">
            <div className="bankInfo__container">
                <div className="planInfo__box">
                    <div style={{ display: "flex", borderBottom: "1px solid black", marginBottom: "2%", paddingBottom: "2%" }}>
                        <div onClick={createPlanFunc} style={{ position: "unset", marginLeft: "1.5%", marginTop: "1.%" }} className="xButton__div">
                            <FontAwesomeIcon icon={faTimes} size="2x" />
                        </div>
                        <div className="planInfo__title"><span>New Plan</span></div>
                    </div>
                    <div className="bankInfo__balanceDiv">
                        <p style={{ fontSize: "13px", color: "red", fontWeight: "600", textAlign: "center" }}>DO NOT USE the "," symbol!!</p>
                        <div style={{ margin: "2% 1.5% 3% 1.5%" }}>
                            <div className="newPlanRow">
                                <label className="planInfo__label">
                                    Plan Name
                                    <input onChange={setPlanFunc} className="planInfo__input" value={planName} name="balance" type="text" required />
                                </label>
                                <label className="planInfo__label">
                                    Job
                                    <input onChange={setJobFunc} className="planInfo__input" value={job} name="balance" type="text" required />
                                </label>
                                <label className="planInfo__label">
                                    Stock Name
                                    <input onChange={setStockFunc} className="planInfo__input" value={stockName} name="balance" type="text" required />
                                </label>
                            </div>
                            <div className="newPlanRow">
                                <label className="planInfo__label">
                                    Monthly Income
                                    <input onChange={setMonthlyFunc} className="planInfo__input" value={monthlyIncome} name="balance" type="text" required />
                                </label>
                                <label className="planInfo__label">
                                    Amount To Save
                                    <input onChange={setAmount} className="planInfo__input" value={amountToSave} name="balance" type="text" required />
                                </label>
                                <label className="planInfo__label">
                                    Target Amount To Invest
                                    <input onChange={setTarget} className="planInfo__input" value={targetAmount} name="balance" type="text" required />
                                </label>
                            </div>
                        </div>
                        <button onClick={submitPlan} style={{ marginTop: "0", marginLeft: "31%", width: "13.8%", fontSize: "1em" }} className="loginButton">Create</button>
                    </div>
                </div>
            </div>
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
        </div>
    )
    
    if (createPlanState) {
        return (
            <>
            {createPlanJSX}
            </>
        )
    }
    return (
        <>
            {noPlans === false ? <div className="stockContent__div">
                <div className="portfolio__totalValue-container">
                    <div style={{ display: "flex", justifyContent: "flex-start" }} className="totalValue__div">
                        <div className="totalValue">Plans</div>
                        <div onClick={createPlanFunc} style={{ width: "11%" }} className="buttonDiv">
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
            </div>  : <NoStocks tab="plans" />}
        </>
    )
}

export default Plans;