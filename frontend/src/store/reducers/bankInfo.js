import { BANKDATA, LOADED } from "../actions/bankInfo";

const initialState = {
    bankInfoLoaded: false
}

const bankDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case BANKDATA: {
            return {
                ...state,
                bankData: action.data
            }
        }
        case LOADED: {
            return {
                ...state,
                bankInfoLoaded: action.value
            }
        }
        default: {
            return state
        }
    }
}

export default bankDataReducer;