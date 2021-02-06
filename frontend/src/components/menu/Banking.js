import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bankingDataLoaded } from "../../store/actions/bankInfo";
import BankofAmerica from "../../assets/bankOfAmerica.svg";
import CapitalOne from "../../assets/capitalOne.png";
import ChaseBank from "../../assets/chaseBank.png";
import CitiBank from "../../assets/citiBank.png";
import FifthThirdBank from "../../assets/fifthThirdBank.png";
import PNCBank from "../../assets/pncBank.jpg";
import Truist from "../../assets/truist.png";
import WellsFargo from "../../assets/wellsFargo.png";


const Banking = () => {
    const dispatch = useDispatch();
    const storeUser = useSelector(state => state.userDataReducer.userData);
    const bankInfo = useSelector(state => state.bankDataReducer.bankData);
    const loaded = useSelector(state => state.bankDataReducer.bankInfoLoaded);
    const [bankData, setBankData] = useState({});
    const [userData, setUserData] = useState({});
    const [loaderIcon, setLoaderIcon] = useState(true);

    useEffect(() => {
        if (storeUser && bankInfo) {
            setBankData(bankInfo);
            setUserData(storeUser);
        }
    }, [storeUser, bankInfo])

    setTimeout(() => {
        setLoaderIcon(false);
        dispatch(bankingDataLoaded(true));
    }, 1500);
    
    const loader = (
        <div className="loaderIcon__div">
            <div id="loader">
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
            <div style={{ display: "none" }} className="inner__mainDiv">
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
        </div>
    )

    return (
        <>
        <div className="menuSelection__backgroundDiv">
            {loaded && (loaded === true || loaderIcon === false) ? <div className="banking__menuSelection__mainDiv">
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
                    {bankData && bankInfo ? <div className="bankInfo__balance">Balance: <span className="bankInfo__balance-span">${bankInfo.accountBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></div> : <></>}
                    {bankInfo ? <div className="bankInfo__balance">Monthly Income: <span className="bankInfo__balance-span">${bankInfo.monthlyIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></div> : <></>}
                </div>
            </div> : loader}
        </div>
        </>
    )
}

export default Banking;
