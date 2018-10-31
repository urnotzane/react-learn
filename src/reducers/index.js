import { combineReducers } from 'redux';
import {todos ,postsBySubreddit } from './todos'

export default combineReducers({
  todos,
  postsBySubreddit
})