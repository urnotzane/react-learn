import React from 'react'
import AddTodo from '../containers/AddTodo';
import HandleTodoList from '../containers/HandleTodoList'
import LoginForm from './LoginForm/index'

const App = () => (
  <div>
    <AddTodo />
    <HandleTodoList />
    <LoginForm />
  </div>
)

export default App