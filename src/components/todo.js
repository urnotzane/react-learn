import React from "react";
import PropTypes from "prop-types";

const Todo = ({ onClick, onDelete, completed, text }) => (
  <div
    onClick={onClick}
    style={{
      color: completed ? "#999" : "#000"
    }}
  >
    {text}->
    <span onClick={onDelete} style={{color:"#f30"}} >删除</span>
  </div>
);

Todo.prototype = {
  onClick: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
};

export default Todo;
