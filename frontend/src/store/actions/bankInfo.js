export const BANKDATA = "BANKDATA";

export const bankData = data => ({ type: BANKDATA, data });

export const updateBalance = (id, token, value) => {
    return async (dispatch) => {
        try {
            const res = await fetch("/api/bank_info/edit", {
                method: "PUT",
                body: JSON.stringify({ userId: id, whatToEdit: "balance", editValue: value, token: token }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                throw res;
            }

            const { BankInfo } = await res.json();
            dispatch(bankData(BankInfo));
        } catch (err) {
            const error = await err.json();
            console.error(error);
        }
    }
}

export const addBankData = (id, token, accountBalance, monthlyIncome) => {
    return async () => {
        try {
            const res = await fetch("/api/bank_info/", {
                method: "POST",
                body: JSON.stringify({ userId: id, token: token, accountBalance: accountBalance, monthlyIncome: monthlyIncome }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                throw res;
            }

            window.location.href = "/homepage";
            
        } catch (err) {
            const error = await err.json();
            console.error(error);
        }
    }
}

export const updateIncome = (id, token, value) => {
    return async (dispatch) => {
        try {
            const res = await fetch("/api/bank_info/edit", {
                method: "PUT",
                body: JSON.stringify({ userId: id, whatToEdit: "income", editValue: value, token: token }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                throw res;
            }

            const { BankInfo } = await res.json();
            dispatch(bankData(BankInfo));
        } catch (err) {
            const error = await err.json();
            console.error(error);
        }
    }
}