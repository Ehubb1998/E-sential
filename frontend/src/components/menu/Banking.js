import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BankofAmerica from "../../assets/bankOfAmerica.svg";
import CapitalOne from "../../assets/capitalOne.png";
import ChaseBank from "../../assets/chaseBank.png";
import CitiBank from "../../assets/citiBank.png";
import FifthThirdBank from "../../assets/fifthThirdBank.png";
import PNCBank from "../../assets/pncBank.jpg";
import Truist from "../../assets/truist.png";
import WellsFargo from "../../assets/wellsFargo.png";
import BankingTabPic from "../../assets/bankComponent.jpg";


const Banking = () => {
    const storeUser = useSelector(state => state.userDataReducer.userData);
    const bankInfo = useSelector(state => state.bankDataReducer.bankData);
    const [bankData, setBankData] = useState({});
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (storeUser && bankInfo) {
            setBankData(bankInfo);
            setUserData(storeUser);
        }
    }, [storeUser, bankInfo])

    return (
        <>
        <div className="menuSelection__backgroundDiv">
            <div className="menuSelection__mainDiv">
                <div className="inner__mainDiv">
                    {userData && storeUser && storeUser.primaryBank === "Bank of America" ? <div className="bankName__div"><img className="bankName__div-image" src={BankofAmerica} alt="" /></div> : <></>}
                    {storeUser && storeUser.primaryBank === "Capital One" ? <div className="bankName__div"><img className="bankName__div-image" src={CapitalOne} alt="" /></div> : <></>}
                    {storeUser && storeUser.primaryBank === "Chase" ? <div className="bankName__div"><img className="bankName__div-image" src={ChaseBank} alt="" /></div> : <></>}
                    {storeUser && storeUser.primaryBank === "Wells Fargo" ? <div className="bankName__div"><img className="bankName__div-image" src={WellsFargo} alt="" /></div> : <></>}
                    {storeUser && storeUser.primaryBank === "Citi Bank" ? <div className="bankName__div"><img className="bankName__div-image" src={CitiBank} alt="" /></div> : <></>}
                    {storeUser && storeUser.primaryBank === "Fifth Third Bank" ? <div className="bankName__div"><img className="bankName__div-image" src={FifthThirdBank} alt="" /></div> : <></>}
                    {storeUser && storeUser.primaryBank === "PNC Bank" ? <div className="bankName__div"><img className="bankName__div-image" src={PNCBank} alt="" /></div> : <></>}
                    {storeUser && storeUser.primaryBank === "Truist" ? <div className="bankName__div"><img className="bankName__div-image" src={Truist} alt="" /></div> : <></>}
                    <div className="bankInfo__div">Bank Information</div>
                    {bankData && bankInfo ? <div className="bankInfo__balance">Balance: <span className="bankInfo__balance-span">${bankInfo.accountBalance}</span></div> : <></>}
                    {bankInfo ? <div className="bankInfo__balance">Monthly Income: <span className="bankInfo__balance-span">${bankInfo.monthlyIncome}</span></div> : <></>}
                </div>
                {/* <img style={{ maxWidth: "100%" }} src={BankingTabPic} height="500" alt="" /> */}
            </div>
        </div>
        </>
    )
}

export default Banking;
