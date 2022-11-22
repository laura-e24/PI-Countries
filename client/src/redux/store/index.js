import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/index.js";
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));
export const dispatch = store.dispatch;
export default store;