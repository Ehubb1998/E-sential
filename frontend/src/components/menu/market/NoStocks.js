import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPlan } from "../../../store/actions/stockInfo";
import Particles from 'react-particles-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTimes } from "@fortawesome/free-solid-svg-icons";

const NoStocks = (props) => {
    const dispatch = useDispatch();
    const token = window.localStorage.getItem("ESENTIAL_ACCESS_TOKEN");
    const userId = window.localStorage.getItem("ESENTIAL_USER_ID");
    const [editNoPlans, setEditNoPlans] = useState(false);
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

    const editNoPlansFunc = () => {
        if (editNoPlans) {
            setEditNoPlans(false);
        } else {
            setEditNoPlans(true);
        }
    }

    const submitPlan = () => {
        dispatch(createPlan(userId, token, planName, job, monthlyIncome, stockName, amountToSave, targetAmount));
    }

    const createPlanJSXMini = (
        <div className="bankInfo__container">
            <div className="planInfo__box">
                <div style={{ display: "flex", borderBottom: "1px solid black", marginBottom: "2%", paddingBottom: "2%" }}>
                    <div onClick={editNoPlansFunc} style={{ position: "unset", marginLeft: "1.5%", marginTop: "1.%" }} className="xButton__div">
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
    )

    if (editNoPlans) {
        return (
            <>
            {createPlanJSXMini}
            </>
        )
    }

    const portfolio = (
        <div className="buyStockDiv"><span className="buyStockSpan">Buy Stocks to see portfolio</span></div>
    );
    const watchList = (
        <div className="buyStockDiv"><span className="buyStockSpan">Add Stocks to your Watch List</span></div>
    );
    const plans = (
        <div className="buyStockDiv">
            <span className="buyStockSpan">
                Create a Plan
                <span onClick={editNoPlansFunc} style={{ cursor: "pointer" }}>
                    <FontAwesomeIcon icon={faPlusCircle} size="1x" />
                </span>
            </span>
        </div>
    )
    return (
        <>
        <div className="stockContent__div">
            {props.tab === "watchList" ? watchList : props.tab === "plans" ? plans : portfolio}
            <Particles
                className='particles'
                height="69.2vh"
                width="95.2vw"
                params={{
                    particles: {
                        color: {
                            value: 'rgb(0, 200, 5)',
                        },
                        number: {
                            value: 80,
                        },
                        size: {
                            value: 4,
                        },
                    },
                    interactivity: {
                        events: {
                            onhover: {
                                enable: true,
                                mode: 'repulse',
                            },
                        },
                    },
                }}
            />
        </div>
        </>
    )
}

export default NoStocks;