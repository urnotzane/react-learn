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

export const REQUEST_POSTS = "REQUEST_POSTS";

export const RECEIVE_POSTS = "RECEIVE_POSTS";


