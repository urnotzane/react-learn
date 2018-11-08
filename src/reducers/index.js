import { combineReducers } from "redux";
import fetchData from "./fetchData";
import commonData from './saveData'
import PageReducer from './PageReducer'

export default combineReducers({
  fetchData,
  commonData,
  ...PageReducer
});
