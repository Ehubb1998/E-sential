import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateEmail, updatePrimaryBank, updateJob } from "../../store/actions/userData";


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
    const [clickedEditBank, setClickedEditBank] = useState(false);
    const [primaryBank, setPrimaryBank] = useState("");
    const [clickedEditJob, setClickedEditJob] = useState(false);
    const [job, setJob] = useState("");

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
        setEmail("");
    }
    const emailInput = (e) => {
        setEmail(e.target.value);
    }
    const submitEmailChanges = () => {
        dispatch(updateEmail(user.id, token, email));
        setClickedEditEmail(false);
        setEmail("");
    }
    const editBank = () => {
        setClickedEditBank(true);
        setOverBankDiv(false);
    }
    const bankBackButton = () => {
        setClickedEditBank(false);
        setPrimaryBank("");
    }
    const primaryBankInput = (e) => {
        setPrimaryBank(e.target.value);
    }
    const submitBankChanges = () => {
        dispatch(updatePrimaryBank(user.id, token, primaryBank));
        setClickedEditBank(false);
        setPrimaryBank("");
    }
    const editJob = () => {
        setClickedEditJob(true);
        setOverJobDiv(false);
    }
    const jobBackButton = () => {
        setClickedEditJob(false);
        setJob("");
    }
    const jobInput = (e) => {
        setJob(e.target.value);
    }
    const submitJobChanges = () => {
        dispatch(updateJob(user.id, token, job));
        setClickedEditJob(false);
        setJob("");
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
    
    const updatePrimaryBankJSX = (
        <div className="menuSelection__backgroundDiv">
            <div className="menuSelection__mainDiv">
                <div className="inner__mainDiv">
                    {user ? <div className="accountName__div">{user.firstName} {user.lastName} • {user.job}</div> : <></>}
                    <div className="bankInfo__div editDiv"><span onClick={bankBackButton} className="backButton">&lt; Back</span><span className="editTitle">Edit Primary Bank</span></div>
                </div>
                <div className="accountInformation__div">
                    <div className="editInput__div">
                        Edit Primary Bank:
                        <select onChange={primaryBankInput} className="editPrimaryBank">
                            <option value="Wells Fargo">Wells Fargo</option>
                            <option value="Bank of America">Bank of America</option>
                            <option value="Capital One">Capital One</option>
                            <option value="Chase">Chase</option>
                            <option value="Citi Bank">Citi Bank</option>
                            <option value="Fifth Third Bank">Fifth Third Bank</option>
                            <option value="PNC Bank">PNC Bank</option>
                            <option value="Truist">Truist</option>
                        </select>
                        <button style={{ marginTop: "10px" }} onClick={submitBankChanges} className="submitChanges">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )

    const updateJobJSX = (
        <div className="menuSelection__backgroundDiv">
            <div className="menuSelection__mainDiv">
                <div className="inner__mainDiv">
                    {user ? <div className="accountName__div">{user.firstName} {user.lastName} • {user.job}</div> : <></>}
                    <div className="bankInfo__div editDiv"><span onClick={jobBackButton} className="backButton">&lt; Back</span><span className="editTitle">Edit Job</span></div>
                </div>
                <div className="accountInformation__div">
                    <div className="editInput__div">
                        Edit Job:
                        <input onChange={jobInput} className="editInput" value={job} name="job" type="text" />
                        <button onClick={submitJobChanges} className="submitChanges">Submit</button>
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
    if (clickedEditBank === true) {
        return (
            updatePrimaryBankJSX
        )
    }
    if (clickedEditJob === true) {
        return (
            updateJobJSX
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
                    {overBankDiv === false ? <div onMouseEnter={overBank} className="account_editSelection"><span>Primary Bank: {user.primaryBank}</span></div> : <div onClick={editBank} onMouseLeave={leftBank} className="account_editSelection"><span>Primary Bank: {user.primaryBank}</span><span className="editSelection__span">Edit &gt;</span></div>}
                    {overJobDiv === false ? <div onMouseEnter={overJob} className="account_editSelection"><span>Job: {user.job}</span></div> : <div onClick={editJob} onMouseLeave={leftJob} className="account_editSelection"><span>Job: {user.job}</span><span className="editSelection__span">Edit &gt;</span></div>}
                    <div className="account_editSelection"><span>Change Password</span></div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Account;