/**
 * 拖车订单所需数据
 * @param {Object} state
 * @param {Function} action
 */
const OrderEntrustData = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_ENTRUST_DATA":
      return Object.assign({}, state, {
        [action.dataName]: action[action.dataName]
      });
    default:
      return state;
  }
};

const PageReducer = {
  OrderEntrustData
}

export default PageReducer
