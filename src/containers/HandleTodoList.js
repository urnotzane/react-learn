import { connect } from 'react-redux'
import { toggleTodo, deleteTodo } from '../actions'
import TodoList from '../components/TodoList'

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

const mapDispatchToProps = dispatch => ({
  toggleTodo: index => dispatch(toggleTodo(index)),
  deleteTodo: index => dispatch(deleteTodo(index))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)