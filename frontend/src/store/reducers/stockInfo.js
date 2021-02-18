import { PORTFOLIO, STOCKINFO, WATCHLIST, PLANS, PORTFOLIOSTOCKCHARTS, FEATUREDSTOCKS, BACKBUTTON, FINISHEDLOADING } from "../actions/stockInfo";

const initialState = {
    stockInfoLoaded: false,
    backButton: false,
    finishedLoading: false
}

const stockDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case PORTFOLIO: {
            return {
                ...state,
                portfolioData: action.data
            }
        }
        case FINISHEDLOADING: {
            return {
                ...state,
                finishedLoading: action.boolean
            }
        }
        case PORTFOLIOSTOCKCHARTS: {
            return {
                ...state,
                portfolioStockCharts: action.data
            }
        }
        case FEATUREDSTOCKS: {
            return {
                ...state,
                featuredStocks: action.data
            }
        }
        case BACKBUTTON: {
            return {
                ...state,
                backButton: action.boolean
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