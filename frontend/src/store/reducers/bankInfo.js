import { BANKDATA } from "../actions/bankInfo";

const bankDataReducer = (state={}, action) => {
    switch (action.type) {
        case BANKDATA: {
            return {
                ...state,
                bankData: action.data
            }
        }
        default: {
            return state
        }
    }
}

export default bankDataReducer;