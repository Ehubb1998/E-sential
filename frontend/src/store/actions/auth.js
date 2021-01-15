import { Redirect } from "react-router-dom";
let errorTitle;
let errorMsg;

export const HANDLE_ERRORS = "HANDLE_ERRORS";
export const CURRENT_USER = "CURRENT_USER";
export const UPDATE_TOKEN_VALUE = "UPDATE_TOKEN_VALUE";

export const updateTokenValue = value => ({ type: UPDATE_TOKEN_VALUE, value });
export const handleErrors = () => ({ type: HANDLE_ERRORS, title: errorTitle, msg: errorMsg });
export const currentUser = (user) => ({ type: CURRENT_USER, user });

export const signUp = (firstName, lastName, email, primaryBank, job, hashedPassword, confirmedPassword, rememberMe) => {
    return async (dispatch) => {
        try {
            const newUser = {firstName: firstName, lastName: lastName, email: email, primaryBank: primaryBank, job: job, hashedPassword: hashedPassword, confirmedPassword: confirmedPassword, rememberMe: rememberMe}
            const res = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                body: JSON.stringify(newUser),
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (!res.ok) {
                throw res;
            }
            const { token, userData } = await res.json();
            dispatch(updateTokenValue(token));
            const id = userData.id;

            window.localStorage.setItem("ESENTIAL_ACCESS_TOKEN", token);
            window.localStorage.setItem("ESENTIAL_USER_ID", id);

            dispatch(currentUser(userData));
            return <Redirect to="/homepage" />

        } catch (err) {
            const { title, errors } = await err.json();
            errorTitle = title;
            errorMsg = errors;
            dispatch(handleErrors());
        }
    }
}

export const logIn = (email, password, rememberMe) => {
    return async (dispatch) => {
        try {
            const userLogin = {email: email, password: password, rememberMe: rememberMe}
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                body: JSON.stringify(userLogin),
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (!res.ok) {
                throw res;
            }
            const { token, userData } = await res.json();
            dispatch(updateTokenValue(token));
            const id = userData.id;

            window.localStorage.setItem("ESENTIAL_ACCESS_TOKEN", token);
            window.localStorage.setItem("ESENTIAL_USER_ID", id);

            dispatch(currentUser(userData));
            return <Redirect to="/homepage" />

        } catch (err) {
            const { title, errors } = await err.json();
            errorTitle = title;
            errorMsg = errors;
            dispatch(handleErrors());
        }
    }
}

export const demo = () => {
    return async (dispatch) => {
        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                body: JSON.stringify({ email: "demo@demo.com", password: "Windows8.1", rememberMe: "True" }),
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (!res.ok) {
                throw res;
            }
            const { token, userData } = await res.json();
            dispatch(updateTokenValue(token));
            const id = userData.id;

            window.localStorage.setItem("ESENTIAL_ACCESS_TOKEN", token);
            window.localStorage.setItem("ESENTIAL_USER_ID", id);

            dispatch(currentUser(userData));
            return <Redirect to="/homepage" />

        } catch (err) {
            console.error(err)
        }
    }
}