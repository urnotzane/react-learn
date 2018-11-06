import { combineReducers } from "redux";
import fetchData from "./fetchData";
import commonData from './saveData'

export default combineReducers({
  fetchData,
  commonData
});
