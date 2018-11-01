import React from 'react'
import { fetchPostsIfNeeded } from '../actions'
import { connect } from 'react-redux'

const AddTodo = ({ dispatch }) => {
  let input

  return (
    <div>
      <form onSubmit={ e => {
        e.preventDefault()
        if(!input.value.trim()) { return }
        dispatch(fetchPostsIfNeeded(input.value))
        input.value = ''
      }} >
        <input ref={node => input = node} />
        <button type="submit">添加</button>
      </form>
      
    </div>
  )
}

export default connect()(AddTodo)