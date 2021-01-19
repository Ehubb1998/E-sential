import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const Banking = () => {
    // const storeToken = useSelector(state => state.auth.token);
    // const storeUser = useSelector(state => state.auth.userData);
    //This useEffect and useState is temporary. I need to set up another slice of state in the store. I'm just too tired rn lol
    // const [bankInfo, setBankInfo] = useState({});
    // const [token, setToken] = useState("");
    // const [user, setUser] = useState({});
    // console.log(user)

    // const bankinfo = async () => {
    //     try {
    //         const res = await fetch(`http://localhost:5000/api/bank_info/info/${user.id}/${token}`);

    //         if (!res.ok) {
    //             throw res;
    //         }
    //         const { BankInfo } = await res.json();
    //         setBankInfo(BankInfo);

    //     } catch (err) {
    //         console.error(err);
    //     }
    // }
    // bankinfo();
    // useEffect(() => {
    //     const bankinfo = async () => {
    //         try{
    //             const res = await fetch(`http://localhost:5000/api/bank_info/info/${user.id}/${token}`);
    
    //             if (!res.ok) {
    //                 throw res;
    //             }
    //             const { BankInfo } = await res.json();
    //             setBankInfo(BankInfo);
    //             setToken(storeToken);
    //             setUser(storeUser);
    //             console.log("In useEffect: " + storeUser);
    
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     }
    //     bankinfo();
    // }, [])
    // console.log(user.primaryBank);

    return (
        <>
        <div className="menuSelection__backgroundDiv">
            <div className="menuSelection__mainDiv">
                <div className="inner__mainDiv">
                    {/* <div className="bankName__div">{user.primaryBank}</div> */}
                    <div className="bankInfo__div">Bank Information</div>
                    {/* <div className="bankInfo__balance">Balance: ${bankInfo.accountBalance}</div>
                    <div className="bankInfo__balance">Monthly Income: ${bankInfo.monthlyIncome}</div> */}
                </div>
            </div>
        </div>
        </>
    )
}

export default Banking;
