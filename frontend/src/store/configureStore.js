import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import auth from "./reducers/auth";
import bankDataReducer from "./reducers/bankInfo";
import userDataReducer from "./reducers/userData";
import stockDataReducer from "./reducers/stockInfo";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    auth,
    bankDataReducer,
    userDataReducer,
    stockDataReducer,
});

const configureStore = (initialState) => {
    return createStore(
        reducer,
        initialState,
        composeEnhancers(applyMiddleware(thunk))
    );
};

export default configureStore;