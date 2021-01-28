import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";


const Account = () => {
    const user = useSelector(state => state.userDataReducer.userData);
    const [userData, setUserData] = useState({});
    const [overEmailDiv, setOverEmailDiv] = useState(false);

    useEffect(() => {
        if (user) {
            setUserData(user)
        }
    }, [user])

    const overEmail = () => {
        setOverEmailDiv(true);
    }
    const leftEmail = () => {
        setOverEmailDiv(false);
    }

    return (
        <>
        <div className="menuSelection__backgroundDiv">
            <div className="menuSelection__mainDiv">
                <div className="inner__mainDiv">
                    {userData && user ? <div className="accountName__div">{user.firstName} {user.lastName} • {user.job}</div> : <></>}
                    <div className="bankInfo__div">Account Information</div>
                </div>
                <div className="accountInformation__div">
                    {overEmailDiv === false ? <div onMouseEnter={overEmail} className="account_editSelection"><span>Email: {user.email}</span></div> : <div onMouseLeave={leftEmail} className="account_editSelection"><span>Email: {user.email}</span><span className="editSelection__span">Edit ></span></div>}
                </div>
            </div>
        </div>
        </>
    )
}

export default Account;