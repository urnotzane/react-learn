import { connect } from "react-redux";
import OrdersEntrust from "../components/Orders-Entrust-View";
import SearchFormCom from "../components/Orders-Entrust-View/SearchForm";
import OrderEntrustDetailCom from "../components/Orders-Entrust-View/OrderEntrustDetail"
import fetchRequestIfNeeded from "../middleware/api";
import { OrderEntrustData } from "../actions";

const mapStateToProps = state => {
  return Object.assign({}, {
    customer: [],//客户
    Supplier: [],//车牌
    Driver: [],//司机
    OrderProp: [],//订单属性 
    Port: [],//口岸
    Yard: [],//堆场
    Company: [],//船公司
    ContainerType: [],//柜型
    CustomsDeclaration: [],//报关方式
    Motorcade: [],//车队
    DispatcherGroup: [],//调度分组
    BusinessType: [],//订单类型
    PaymentMethod: [],//付款方式
    OrderStatus: [],//订单状态
    Currency: [],//币种
    OrderType: [],//运单分类
    CustomerContact: [],//客户联系人
    Employee: [],//业务员
    TradeWay: [],//贸易方式
    ...state.OrderEntrustData
  })
}

const mapDispatchToProps = dispatch => ({
  fetchRequestIfNeeded: (url, method, params) =>
    dispatch(fetchRequestIfNeeded(url, method, params)),
  saveOrderEntrustData: (data, dataName) => dispatch(OrderEntrustData(data, dataName))
});

const OrdersEntrustView = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersEntrust)

/**搜索表单 */
const SearchForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchFormCom)

/**订单详情 */
const OrderEntrustDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderEntrustDetailCom)


export { OrdersEntrustView, SearchForm, OrderEntrustDetail } 
