import { combineReducers } from "redux";
import alert from "./alert";
import authentication from "./auth";

export default combineReducers({ alert, authentication });
