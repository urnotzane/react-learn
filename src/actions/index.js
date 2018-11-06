export const addTodo = text => {
  return {
    type: "ADD_TODO",
    text
  };
};

export const toggleTodo = id => {
  return {
    type: "TOGGLE_TODO",
    id
  };
};

export const deleteTodo = id => {
  return {
    type: "DELETE_TODO",
    id
  };
};

export const FETCH_REQUEST = "FETCH_REQUEST";

export const FETCH_RECEIVE = "FETCH_RECEIVE";


