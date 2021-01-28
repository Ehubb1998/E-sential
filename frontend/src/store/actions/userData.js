export const CURRENT_USER = "CURRENT_USER";

export const currentUser = (user) => ({ type: CURRENT_USER, user });

export const updatePrimaryBank = (id, token, value) => {
    return async (dispatch) => {
        try {
            if (value === "") {
                value = "Wells Fargo"
            }
            const res = await fetch("/api/user/edit", {
                method: "PUT",
                body: JSON.stringify({ userId: id, whatToEdit: "bank", editValue: value, token: token }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                throw res;
            }

            const { userData } = await res.json();
            dispatch(currentUser(userData));
        } catch (err) {
            const error = await err.json();
            console.error(error);
        }
    }
}

export const updateEmail = (id, token, value) => {
    return async (dispatch) => {
        try {
            const res = await fetch("/api/user/edit", {
                method: "PUT",
                body: JSON.stringify({ userId: id, whatToEdit: "email", editValue: value, token: token }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                throw res;
            }

            const { userData } = await res.json();
            dispatch(currentUser(userData));
        } catch (err) {
            const error = await err.json();
            console.error(error);
        }
    }
}

export const updateJob = (id, token, value) => {
    return async (dispatch) => {
        try {
            const res = await fetch("/api/user/edit", {
                method: "PUT",
                body: JSON.stringify({ userId: id, whatToEdit: "job", editValue: value, token: token }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                throw res;
            }

            const { userData } = await res.json();
            dispatch(currentUser(userData));
        } catch (err) {
            const error = await err.json();
            console.error(error);
        }
    }
}

export const confirmPassword = (id, token, value) => {
    return async () => {
        try {
            const res = await fetch("/api/user/edit", {
                method: "PUT",
                body: JSON.stringify({ userId: id, whatToEdit: "password", editValue: value, token: token }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                throw res;
            }

            const result = await res.json();
            console.log(result);
        } catch (err) {
            const error = await err.json();
            console.error(error);
        }
    }
}