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

/**存储公共数据的action */
export const saveData = (data, dataName) => {
  return {
    type: "SAVE_DATA",
    [dataName]: data,
    dataName
  };
};

export const OrderEntrustData = (data, dataName) => {
  return {
    type: 'ORDER_ENTRUST_DATA',
    [dataName]: data,
    dataName
  }
}
