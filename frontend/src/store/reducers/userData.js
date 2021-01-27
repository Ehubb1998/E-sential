import { CURRENT_USER } from "../actions/userData";

const userDataReducer = (state={}, action) => {
    switch (action.type) {
        case CURRENT_USER: {
            return {
                ...state,
                userData: action.user
            }
        }
        default: {
            return state
        }
    }
}

export default userDataReducer;