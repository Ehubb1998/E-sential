import { PORTFOLIO, STOCKINFO, WATCHLIST, PLANS } from "../actions/stockInfo";

const initialState = {
    stockInfoLoaded: false
}

const stockDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case PORTFOLIO: {
            return {
                ...state,
                portfolioData: action.data
            }
        }
        case STOCKINFO: {
            return {
                ...state,
                stockInfo: action.data
            }
        }
        case WATCHLIST: {
            return {
                ...state,
                watchList: action.data
            }
        }
        case PLANS: {
            return {
                ...state,
                plans: action.data
            }
        }
        default: {
            return state
        }
    }
}

export default stockDataReducer;