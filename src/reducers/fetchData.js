// import { FETCH_REQUEST_PENDING, FETCH_REQUEST_FULFILLED } from "../actions";

function posts(
  state = {
    isFetching: false,
    didInvalidate: false,
    data: {}
  },
  action
) {
  switch (action.type) {
    case "FETCH_REQUEST_PENDING":
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case "FETCH_REQUEST_FULFILLED":
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        data: action.data,
        lastUpdated: action.receivedAt
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
        [action.dataName]: posts(state[action.dataName], action)
      });
    default:
      return state;
  }
}

export { fetchData };
