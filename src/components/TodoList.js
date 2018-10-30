import React from "react";
import PropTypes from "prop-types";
import Todo from "./todo";

const TodoList = ({ todos, toggleTodo, deleteTodo }) => {
  if (todos && todos.length > 0) {
    return (
      <div>
        {todos.map((todo, index) => (
          <Todo
            key={index}
            {...todo}
            onClick={() => toggleTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
          />
        ))}
      </div>
    );
  } else {
    return <div />;
  }
};

TodoList.prototype = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  toggleTodo: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default TodoList;
