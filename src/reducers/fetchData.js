// import { FETCH_REQUEST_PENDING, FETCH_REQUEST_FULFILLED } from "../actions";

function posts(
  state = {
    isFetching: false
  },
  action
) {
  switch (action.type) {
    case "FETCH_REQUEST_PENDING":
      return Object.assign({}, state, {
        isFetching: true
      });
    case "FETCH_REQUEST_FULFILLED":
      return Object.assign({}, state, {
        isFetching: false,
        payload: action.payload
      });
    case "FETCH_REQUEST_REJECTED":
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}

function fetchData(state = {}, action) {
  switch (action.type) {
    case "FETCH_REQUEST_PENDING":
    case "FETCH_REQUEST_FULFILLED":
    case "FETCH_REQUEST_REJECTED":
      return Object.assign({}, state, {
        ...posts(state, action)
      });
    default:
      return state;
  }
}

export default fetchData
