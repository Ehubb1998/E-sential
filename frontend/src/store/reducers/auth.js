import { HANDLE_ERRORS, CURRENT_USER, UPDATE_TOKEN_VALUE } from "../actions/auth"

const initialState = {
    token: ""
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case HANDLE_ERRORS: {
            return {
                ...state,
                title: action.title,
                msg: action.msg
            }
        }
        case CURRENT_USER: {
            return {
                ...state,
                userData: action.user
            }
        }
        case UPDATE_TOKEN_VALUE: {
            return {
                ...state,
                token: action.value
            }
        }
        default: {
            return state
        }
    }
};

export default authReducer;