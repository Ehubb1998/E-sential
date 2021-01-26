import React from "react";
import { useSelector } from "react-redux";


const Banking = () => {
    const storeUser = useSelector(state => state.auth.userData);
    const bankInfo = useSelector(state => state.bankDataReducer.bankData);


    return (
        <>
        <div className="menuSelection__backgroundDiv">
            <div className="menuSelection__mainDiv">
                <div className="inner__mainDiv">
                    {storeUser ? <div className="bankName__div">{storeUser.primaryBank}</div> : <></>}
                    <div className="bankInfo__div">Bank Information</div>
                    {bankInfo ? <div className="bankInfo__balance">Balance: ${bankInfo.accountBalance}</div> : <></>}
                    {bankInfo ? <div className="bankInfo__balance">Monthly Income: ${bankInfo.monthlyIncome}</div> : <></>}
                </div>
            </div>
        </div>
        </>
    )
}

export default Banking;
