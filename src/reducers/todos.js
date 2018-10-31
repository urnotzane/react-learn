import {
  REQUEST_POSTS,
  RECEIVE_POSTS
} from '../actions'

function posts(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function postsBySubreddit(state = [], action) {
  switch (action.type) {
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action)
      })
    default:
      return state
  }
}

let id = 0;
const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          text: action.text,
          completed: false,
          id: id++
        }
      ];
    case "TOGGLE_TODO":
      state = state.map(
        todo =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
      return [...state];
    case "DELETE_TODO":
      let _index;
      state.forEach((item, index) => {
        if (item.id === action.id) {
          _index = index;
        }
      });
      state.splice(_index, 1);
      return [...state];
    default:
      return state;
  }
};

export {
  todos,
  postsBySubreddit
};
