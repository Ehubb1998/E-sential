import { HANDLE_ERRORS, UPDATE_TOKEN_VALUE, CLEAR_ERRORS } from "../actions/auth"

const initialState = {
    token: ""
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case HANDLE_ERRORS: {
            return {
                ...state,
                msg: action.msg
            }
        }
        case UPDATE_TOKEN_VALUE: {
            return {
                ...state,
                token: action.value
            }
        }
        case CLEAR_ERRORS: {
            return {
                token: null
            }
        }
        default: {
            return state
        }
    }
};

export default authReducer;