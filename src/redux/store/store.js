import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import authentication from "../reducers/authentication";

const reducers = combineReducers({authentication})

const store = createStore(reducers, applyMiddleware(thunk))

export default store;