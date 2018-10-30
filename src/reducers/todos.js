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

export default todos;
