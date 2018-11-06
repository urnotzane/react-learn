/**
 * 用来存储公共数据的reducer
 * @param {Object} state
 * @param {Function} action
 */
const commonData = (state = {}, action) => {
  switch (action.type) {
    case "SAVE_DATA":
      return Object.assign({}, state, {
        [action.dataName]: action[action.dataName]
      });
    default:
      return state;
  }
};

export default commonData;
