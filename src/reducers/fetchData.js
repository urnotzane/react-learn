import { REQUEST_POSTS, RECEIVE_POSTS } from "../actions";

function posts(
  state = {
    isFetching: false,
    didInvalidate: false,
    data: {}
  },
  action
) {
  switch (action.type) {
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_POSTS:
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
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.dataName]: posts(state[action.dataName], action)
      });
    default:
      return state;
  }
}

export { fetchData };
