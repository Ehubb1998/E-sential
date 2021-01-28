import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateEmail } from "../../store/actions/userData";


const Account = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userDataReducer.userData);
    const token = useSelector(state => state.auth.token);
    const [userData, setUserData] = useState({});
    const [overEmailDiv, setOverEmailDiv] = useState(false);
    const [overBankDiv, setOverBankDiv] = useState(false);
    const [overJobDiv, setOverJobDiv] = useState(false);
    const [clickedEditEmail, setClickedEditEmail] = useState(false);
    const [email, setEmail] = useState("");

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
    const overBank = () => {
        setOverBankDiv(true);
    }
    const leftBank = () => {
        setOverBankDiv(false);
    }
    const overJob = () => {
        setOverJobDiv(true);
    }
    const leftJob = () => {
        setOverJobDiv(false);
    }
    const editEmail = () => {
        setClickedEditEmail(true);
        setOverEmailDiv(false);
    }
    const emailBackButton = () => {
        setClickedEditEmail(false);
    }
    const emailInput = (e) => {
        setEmail(e.target.value);
    }
    const submitEmailChanges = () => {
        dispatch(updateEmail(user.id, token, email));
        setClickedEditEmail(false);
    }

    const updateEmailJSX = (
        <div className="menuSelection__backgroundDiv">
            <div className="menuSelection__mainDiv">
                <div className="inner__mainDiv">
                    {user ? <div className="accountName__div">{user.firstName} {user.lastName} • {user.job}</div> : <></>}
                    <div className="bankInfo__div editDiv"><span onClick={emailBackButton} className="backButton">&lt; Back</span><span className="editTitle">Edit Email</span></div>
                </div>
                <div className="accountInformation__div">
                    <div className="editInput__div">
                        Edit Email: 
                        <input onChange={emailInput} className="editInput" value={email} name="email" type="email" />
                        <button onClick={submitEmailChanges} className="submitChanges">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )

    if (clickedEditEmail === true) {
        return (
            updateEmailJSX
        )
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
                    {overEmailDiv === false ? <div onMouseEnter={overEmail} className="account_editSelection"><span>Email: {user.email}</span></div> : <div onClick={editEmail} onMouseLeave={leftEmail} className="account_editSelection"><span>Email: {user.email}</span><span className="editSelection__span">Edit &gt;</span></div>}
                    {overBankDiv === false ? <div onMouseEnter={overBank} className="account_editSelection"><span>Primary Bank: {user.primaryBank}</span></div> : <div onMouseLeave={leftBank} className="account_editSelection"><span>Primary Bank: {user.primaryBank}</span><span className="editSelection__span">Edit &gt;</span></div>}
                    {overJobDiv === false ? <div onMouseEnter={overJob} className="account_editSelection"><span>Job: {user.job}</span></div> : <div onMouseLeave={leftJob} className="account_editSelection"><span>Job: {user.job}</span><span className="editSelection__span">Edit &gt;</span></div>}
                    <div className="account_editSelection"><span>Change Password</span></div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Account;