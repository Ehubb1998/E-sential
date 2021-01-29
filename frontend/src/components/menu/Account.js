import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateEmail, updatePrimaryBank, updateJob, confirmPassword, updatePassword } from "../../store/actions/userData";

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
    const [clickedEditPassword, setClickedEditPassword] = useState(false);
    const [confirmPasswordI, setConfirmPasswordI] = useState("");
    const [passwordResult, setPasswordResult] = useState(false);
    const [wrongCP, setWrongCP] = useState(false);
    const [cpPassword, setCpPassword] = useState("");
    const [password, setPassword] = useState("");
    const [matchError, setMatchError] = useState(false);
    const [justChangedPassword, setJustChangedPassword] = useState(false);
    const [enterTransition, setEnterTransition] = useState(false);

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
        setEnterTransition(true);
        // setClickedEditEmail(true);
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
    const editPassword = () => {
        setClickedEditPassword(true);
    }
    const passwordBackButton = () => {
        setClickedEditPassword(false);
        setPasswordResult(false);
        setWrongCP(false);
        setMatchError(false);
        setCpPassword("");
        setConfirmPasswordI("");
        setPassword("");
    }
    const confirmPasswordInput = (e) => {
        setConfirmPasswordI(e.target.value);
    }
    const confirmPasswordResults = () => {
        const results = window.localStorage.getItem("PASSWORD_RESULTS");

        if (results === "false") {
            setWrongCP(true);
            window.localStorage.removeItem("PASSWORD_RESULTS");
            return;
        }
        if (results === "true") {
            setPasswordResult(true);
            setWrongCP(false);
            window.localStorage.removeItem("PASSWORD_RESULTS");
        }
    }
    const submitConfirmPasswordChanges = () => {
        dispatch(confirmPassword(user.id, token, confirmPasswordI));
        setTimeout(() => {
            confirmPasswordResults()
        }, 500);
    }
    const passwordInput = (e) => {
        setPassword(e.target.value);
    }
    const cpPasswordInput = (e) => {
        setCpPassword(e.target.value);
    }
    const updatedPasswordResults = () => {
        const result = window.localStorage.getItem("PASSWORD_RESULT");

        if (result === "true") {
            window.localStorage.removeItem("PASSWORD_RESULT");
            setJustChangedPassword(true);
            setPasswordResult(false);
            setClickedEditPassword(false);
            setWrongCP(false);
            setMatchError(false);
            setCpPassword("");
            setConfirmPasswordI("");
            setPassword("");
        }
    }
    const submitPasswordChanges = () => {
        if (password !== cpPassword || password === "" || password === null) {
            setMatchError(true);
            return;
        }
        dispatch(updatePassword(user.id, token, password));
        setTimeout(() => {
            updatedPasswordResults();
        }, 500);
    }

    if (enterTransition === true) {
        setTimeout(() => {
            setClickedEditEmail(true);
            setEnterTransition(false);
        }, 100)
        return (
            <>
            <div className="menuSelection__backgroundDiv">
                <div className="menuSelection__mainDiv overflowHidden">
                    <div className="inner__mainDiv">
                        {userData && user ? <div className="accountName__div">{user.firstName} {user.lastName} • {user.job}</div> : <></>}
                        <div className="bankInfo__div acountPageTransition acountPageTransition-active">Account Information</div>
                    </div>
                    <div className="accountInformation__div acountPageTransition acountPageTransition-active">
                        {overEmailDiv === false ? <div onMouseEnter={overEmail} className="account_editSelection"><span>Email: {user.email}</span></div> : <div onClick={editEmail} onMouseLeave={leftEmail} className="account_editSelection"><span>Email: {user.email}</span><span className="editSelection__span">Edit &gt;</span></div>}
                        {overBankDiv === false ? <div onMouseEnter={overBank} className="account_editSelection"><span>Primary Bank: {user.primaryBank}</span></div> : <div onClick={editBank} onMouseLeave={leftBank} className="account_editSelection"><span>Primary Bank: {user.primaryBank}</span><span className="editSelection__span">Edit &gt;</span></div>}
                        {overJobDiv === false ? <div onMouseEnter={overJob} className="account_editSelection"><span>Job: {user.job}</span></div> : <div onClick={editJob} onMouseLeave={leftJob} className="account_editSelection"><span>Job: {user.job}</span><span className="editSelection__span">Edit &gt;</span></div>}
                        <div onClick={editPassword} className="account_editSelection"><span>Change Password</span></div>
                    </div>
                </div>
            </div>
            </>
        )
    }

    const updateEmailJSX = (
        <div className="menuSelection__backgroundDiv">
            <div className="menuSelection__mainDiv overflowHidden">
                <div className="inner__mainDiv">
                    {user ? <div className="accountName__div">{user.firstName} {user.lastName} • {user.job}</div> : <></>}
                    <div className="bankInfo__div editDiv editPageTransition editPageTransition-active"><span onClick={emailBackButton} className="backButton">&lt; Back</span><span className="editTitle">Edit Email</span></div>
                </div>
                <div className="accountInformation__div editPageTransition editPageTransition-active">
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

    const confirmPasswordJSX = (
        <div className="menuSelection__backgroundDiv">
            <div className="menuSelection__mainDiv">
                <div className="inner__mainDiv">
                    {user ? <div className="accountName__div">{user.firstName} {user.lastName} • {user.job}</div> : <></>}
                    <div className="bankInfo__div editDiv"><span onClick={passwordBackButton} className="backButton">&lt; Back</span><span className="editTitle">Edit Password</span></div>
                </div>
                <div className="accountInformation__div">
                    {wrongCP === true ? <div className="wrongCP__message">Incorrect Password</div> : <></>}
                    <div className="editInput__div">
                        Please Enter Current Password:
                        {wrongCP === true ? <input onChange={confirmPasswordInput} className="wrongCP" value={confirmPasswordI} name="cp" type="password" /> : <input onChange={confirmPasswordInput} className="editInput" value={confirmPasswordI} name="cp" type="password" />}
                        <button onClick={submitConfirmPasswordChanges} className="submitChanges">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    )

    const updatePasswordJSX = (
        <div className="menuSelection__backgroundDiv">
            <div className="menuSelection__mainDiv">
                <div className="inner__mainDiv">
                    {user ? <div className="accountName__div">{user.firstName} {user.lastName} • {user.job}</div> : <></>}
                    <div className="bankInfo__div editDiv"><span onClick={passwordBackButton} className="backButton">&lt; Back</span><span className="editTitle">Edit Password</span></div>
                </div>
                <div className="accountInformation__div">
                    {matchError === true ? <div className="wrongCP__message">Passwords must match</div> : <></>}
                    <div className="editInput__div">
                        Edit Password:
                        {matchError === true ? <input onChange={passwordInput} className="wrongCP" value={password} name="password" type="password" /> : <input onChange={passwordInput} className="editInput" value={password} name="password" type="password" />}
                    </div>
                    <div className="editInput__div">
                        Confirm Password:
                        {matchError === true ? <input onChange={cpPasswordInput} className="wrongCP" value={cpPassword} name="cpPassword" type="password" /> : <input onChange={cpPasswordInput} className="editInput" value={cpPassword} name="cpPassword" type="password" />}
                        <button onClick={submitPasswordChanges} className="submitChanges">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )

    const changedPassword = (
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
                    <div onClick={editPassword} className="account_editSelection"><span>Change Password</span><span className="changedPassword">Password Successfully Changed</span></div>
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
    if (passwordResult === true) {
        return (
            updatePasswordJSX
        )
    }
    if (clickedEditPassword === true) {
        return (
            confirmPasswordJSX
        )
    }
    if (justChangedPassword === true) {
        setTimeout(() => {
            setJustChangedPassword(false);
        }, 3000)
        return (
            changedPassword
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
                    <div onClick={editPassword} className="account_editSelection"><span>Change Password</span></div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Account;