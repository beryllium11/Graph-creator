import {combineReducers, createStore} from "redux";
import controllerReducer from "./controllerReducer";

let reducers = combineReducers({
    controllerPage: controllerReducer
});

let store = createStore(reducers);

window.store = store;

export default store;
