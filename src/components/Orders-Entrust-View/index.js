import React from "react";
import PageHeader from './PageHeader'
import './index.less'
import { SearchForm } from '../../containers/Orders-Entrust-View'

class OrdersEntrustView extends React.Component {
  componentDidMount() {
    console.log(this)
    this.fetchCustomer()
  }

  // 所有客户
  fetchCustomer = () => {
    this.props.fetchRequestIfNeeded("/api/Partner/GetList", 'get', {
      parnterType: 1
    })
      .then(json => {
        console.log(json)
        if (json.result) {
          this.setState({
            customer: json.Data
          });
        }
      });
  };
  // 订单属性
  fetchOrderProp = () => {
    this.props.fetchRequestIfNeeded("/Dictionary/DictGetChild", 'post', {
      Code: 'TruckType',
      NameSort: 'Order'
    })
      .then(json => {
        if (json.result) {
          this.setState({
            OrderProp: json.root
          });
        }
      });
  }
  // 口岸 
  fetchPort = () => {
    this.props.fetchRequestIfNeeded("/api/Port/GetList", 'get', {})
      .then(json => {
        if (json.result) {
          this.setState({
            Port: json.Data
          });
        }
      });
  }
  // 堆场 
  fetchYard = () => {
    this.props.fetchRequestIfNeeded("/api/Yard/GetList", 'get', {})
      .then(json => {
        if (json.result) {
          this.setState({
            Yard: json.Data
          });
        }
      });
  }
  // 船公司 
  fetchCompany = () => {
    this.props.fetchRequestIfNeeded("/api/Partner/GetShipCompanyList", 'get', {})
      .then(json => {
        if (json.result) {
          this.setState({
            Company: json.Data
          });
        }
      });
  }
  // 柜型 
  fetchContainerType = () => {
    this.props.fetchRequestIfNeeded("/Dictionary/DictGetChild", 'get', {
      Code: 'SP_ContainerType',
      NameSort: 'Order'
    })
      .then(json => {
        if (json.result) {
          this.setState({
            ContainerType: json.root
          });
        }
      });
  }
  // 报关方式 
  fetchCustomsDeclaration = () => {
    this.props.fetchRequestIfNeeded("/Dictionary/DictGetChild", 'get', {
      Code: 'CustomsDeclaration',
      NameSort: 'Order'
    })
      .then(json => {
        if (json.result) {
          this.setState({
            CustomsDeclaration: json.root
          });
        }
      });
  }
  // 车队 
  fetchMotorcade = () => {
    this.props.fetchRequestIfNeeded("/api/Partner/GetList", 'get', {
      parnterType: 3
    })
      .then(json => {
        if (json.result) {
          this.setState({
            Motorcade: json.Data
          });
        }
      });
  }
  // 调度分组
  fetchDispatcherGroup = () => {
    this.props.fetchRequestIfNeeded("/Dictionary/DictGetChild", 'get', {
      Code: 'DispatcherGroup',
      NameSort: 'Order'
    })
      .then(json => {
        if (json.result) {
          this.setState({
            DispatcherGroup: json.root
          });
        }
      });
  }
  // 订单类型
  fetchBusinessType = () => {
    this.props.fetchRequestIfNeeded("/Dictionary/DictGetChild", 'get', {
      Code: 'SP_BusinessType'
    })
      .then(json => {
        if (json.result) {
          this.setState({
            BusinessType: json.root
          });
        }
      });
  }
  // 付款方式
  fetchPaymentMethod = () => {
    this.props.fetchRequestIfNeeded("/Dictionary/DictGetChild", 'get', {
      Code: 'PaymentMethod',
      NameSort: 'Order'
    })
      .then(json => {
        if (json.result) {
          this.setState({
            PaymentMethod: json.root
          });
        }
      });
  }
  // 订单状态
  fetchOrderStatus = () => {
    this.props.fetchRequestIfNeeded("/Dictionary/DictGetChild", 'get', {
      Code: 'OrderStatus',
      NameSort: 'Order'
    })
      .then(json => {
        if (json.result) {
          this.setState({
            OrderStatus: json.root
          });
        }
      });
  }
  // 币种
  fetchCurrency = () => {
    this.props.fetchRequestIfNeeded("/Dictionary/DictGetChild", 'get', {
      Code: 'Currency',
      NameSort: 'Order'
    })
      .then(json => {
        if (json.result) {
          this.setState({
            Currency: json.root
          });
        }
      });
  }
  // 运单分类
  fetchOrderType = () => {
    this.props.fetchRequestIfNeeded("/Dictionary/DictGetChild", 'get', {
      Code: 'OrderType',
      NameSort: 'Order'
    })
      .then(json => {
        if (json.result) {
          this.setState({
            OrderType: json.root
          });
        }
      });
  }
  // 客户联系人
  fetchCustomerContact = () => {
    this.props.fetchRequestIfNeeded("/api/PartnerContact/GetListNoDriver", 'get', {})
      .then(json => {
        if (json.result) {
          this.setState({
            CustomerContact: json.Data
          });
        }
      });
  }
  // 业务员
  fetchEmployee = () => {
    this.props.fetchRequestIfNeeded("/Employee/Search", 'post', {})
      .then(json => {
        if (json.result) {
          this.setState({
            Employee: json.root
          });
        }
      });
  }
  // 贸易方式
  fetchTradeWay = () => {
    this.props.fetchRequestIfNeeded("/Dictionary/DictGetChild", 'post', { Code: 'TradeWay' })
      .then(json => {
        if (json.result) {
          this.setState({
            TradeWay: json.root
          });
        }
      });
  }

  render() {
    return (
      <div className="OrdersEntrustView-container">
        <PageHeader />
        <div className="main-content">
          <SearchForm />
        </div>
      </div>
    )
  }
}
export default OrdersEntrustView;
