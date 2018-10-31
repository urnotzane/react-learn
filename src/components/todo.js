import React from "react";
import PropTypes from "prop-types";

const Todo = ({ onClick, onDelete, completed, text }) => (
  <div>
    <span
      onClick={onClick}
      style={{
        color: completed ? "#999" : "#000"
      }}
    >
      {text}
    </span>
    ->
    <span onClick={onDelete} style={{ color: "#f30" }}>
      删除
    </span>
  </div>
);

Todo.prototype = {
  onClick: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
};

export default Todo;
