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
    default:
      return state;
  }
}

function fetchData(state = [], action) {
  switch (action.type) {
    case "FETCH_REQUEST_FULFILLED":
    case "FETCH_REQUEST":
      return Object.assign({}, state, {
        data: posts(state, action)
      });
    default:
      return state;
  }
}

export { fetchData };
