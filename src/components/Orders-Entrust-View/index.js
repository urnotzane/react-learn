import React from "react";
import PageHeader from "./PageHeader";
import "./index.less";
import { SearchForm } from "../../containers/Orders-Entrust-View";

class OrdersEntrustView extends React.Component {
  state = {
    loading: false,
    OrderList: [],
    total: 0,
    PageIndex: 1,
    PageSize: 20,
    SearchData: {}, //搜索表单的数据
    ChangeType: 0,
    isDispatcher: true,
    isViewAll: true,
    isOperate: true,
    isSearchMy: false,
    visible: false //详情弹出框
  };
  componentDidMount() {
    console.log(this);
    this.fetchBusinessType();
    this.fetchCompany();
    this.fetchContainerType();
    this.fetchCustomer();
    this.fetchCustomsDeclaration();
    this.fetchDispatcherGroup();
    this.fetchDriver();
    this.fetchMotorcade();
    this.fetchOrderProp();
    this.fetchPort();
    this.fetchSupplier();
    this.fetchYard();
    this.fetchPaymentMethod();
    this.fetchOrderStatus();
    this.fetchCurrency();
    this.fetchOrderType();
    this.fetchCustomerContact();
    this.fetchEmployee();
    this.fetchTradeWay();
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  //搜索
  setSearchData = data => {
    this.setState({ SearchData: data }, () => this.fetchList());
  };

  // 订单列表
  fetchList = () => {
    this.setState({
      loading: true
    });
    this.props
      .fetchRequestIfNeeded("/api/OrderEntrust/Search", "get", {
        PageIndex: this.state.PageIndex,
        PageSize: this.state.PageSize,
        ChangeType: this.state.ChangeType,
        isDispatcher: this.state.isDispatcher,
        isViewAll: this.state.isViewAll,
        isOperate: this.state.isOperate,
        isSearchMy: this.state.isSearchMy,
        ...this.state.SearchData
      })
      .then(json => {
        this.setState({
          loading: false
        });
        if (json.value) {
          json.value.Data.forEach((item, index) => {
            item.Freight = item.Freight ? item.Freight.toFixed(2) : "";
            item.ListIndex = ++index;
          });
          this.setState({
            OrderList: json.value.Data,
            total: json.value.RecordCount
          });
          console.log(this);
        }
      });
  };

  // 车牌
  fetchSupplier = () => {
    this.props
      .fetchRequestIfNeeded("/api/Partner/GetList", "get", {
        parnterType: 4
      })
      .then(json => {
        if (json.value) {
          this.props.saveOrderEntrustData(json.value.Data, "Supplier");
        }
      });
  };

  // 所有司机
  fetchDriver = () => {
    this.props
      .fetchRequestIfNeeded("/api/PartnerContact/GetListByType", "get", {
        contactType: 3
      })
      .then(json => {
        if (json.value) {
          this.props.saveOrderEntrustData(json.value.Data, "Driver");
        }
      });
  };

  // 所有客户
  fetchCustomer = () => {
    this.props
      .fetchRequestIfNeeded("/api/Partner/GetList", "get", {
        parnterType: 1
      })
      .then(json => {
        if (json.value) {
          this.props.saveOrderEntrustData(json.value.Data, "customer");
        }
      });
  };
  // 订单属性
  fetchOrderProp = () => {
    this.props
      .fetchRequestIfNeeded("/Dictionary/DictGetChild", "post", {
        Code: "TruckType",
        NameSort: "Order"
      })
      .then(json => {
        if (json.value) {
          this.props.saveOrderEntrustData(json.value.Data, "OrderProp");
        }
      });
  };
  // 口岸
  fetchPort = () => {
    this.props
      .fetchRequestIfNeeded("/api/Port/GetList", "get", {})
      .then(json => {
        if (json.value) {
          this.props.saveOrderEntrustData(json.value.Data, "Port");
        }
      });
  };
  // 堆场
  fetchYard = () => {
    this.props
      .fetchRequestIfNeeded("/api/Yard/GetList", "get", {})
      .then(json => {
        if (json.value) {
          this.props.saveOrderEntrustData(json.value.Data, "Yard");
        }
      });
  };
  // 船公司
  fetchCompany = () => {
    this.props
      .fetchRequestIfNeeded("/api/Partner/GetShipCompanyList", "get", {})
      .then(json => {
        if (json.value) {
          this.props.saveOrderEntrustData(json.value.Data, "Company");
        }
      });
  };
  // 柜型
  fetchContainerType = () => {
    this.props
      .fetchRequestIfNeeded("/Dictionary/DictGetChild", "get", {
        Code: "SP_ContainerType",
        NameSort: "Order"
      })
      .then(json => {
        if (json.value) {
          this.props.saveOrderEntrustData(json.value.Data, "ContainerType");
        }
      });
  };
  // 报关方式
  fetchCustomsDeclaration = () => {
    this.props
      .fetchRequestIfNeeded("/Dictionary/DictGetChild", "get", {
        Code: "CustomsDeclaration",
        NameSort: "Order"
      })
      .then(json => {
        if (json.value) {
          this.props.saveOrderEntrustData(
            json.value.Data,
            "CustomsDeclaration"
          );
        }
      });
  };
  // 车队
  fetchMotorcade = () => {
    this.props
      .fetchRequestIfNeeded("/api/Partner/GetList", "get", {
        parnterType: 3
      })
      .then(json => {
        if (json.value) {
          this.props.saveOrderEntrustData(json.value.Data, "Motorcade");
        }
      });
  };
  // 调度分组
  fetchDispatcherGroup = () => {
    this.props
      .fetchRequestIfNeeded("/Dictionary/DictGetChild", "get", {
        Code: "DispatcherGroup",
        NameSort: "Order"
      })
      .then(json => {
        if (json.value) {
          this.props.saveOrderEntrustData(json.value.Data, "DispatcherGroup");
        }
      });
  };
  // 订单类型
  fetchBusinessType = () => {
    this.props
      .fetchRequestIfNeeded("/Dictionary/DictGetChild", "get", {
        Code: "SP_BusinessType"
      })
      .then(json => {
        if (json.value) {
          this.props.saveOrderEntrustData(json.value.Data, "BusinessType");
        }
      });
  };
  // 付款方式
  fetchPaymentMethod = () => {
    this.props
      .fetchRequestIfNeeded("/Dictionary/DictGetChild", "get", {
        Code: "PaymentMethod",
        NameSort: "Order"
      })
      .then(json => {
        if (json.value) {
          this.props.saveOrderEntrustData(json.value.Data, "PaymentMethod");
        }
      });
  };
  // 订单状态
  fetchOrderStatus = () => {
    this.props
      .fetchRequestIfNeeded("/Dictionary/DictGetChild", "get", {
        Code: "OrderStatus",
        NameSort: "Order"
      })
      .then(json => {
        if (json.value) {
          this.props.saveOrderEntrustData(json.value.Data, "OrderStatus");
        }
      });
  };
  // 币种
  fetchCurrency = () => {
    this.props
      .fetchRequestIfNeeded("/Dictionary/DictGetChild", "get", {
        Code: "Currency",
        NameSort: "Order"
      })
      .then(json => {
        if (json.value) {
          this.props.saveOrderEntrustData(json.value.Data, "Currency");
        }
      });
  };
  // 运单分类
  fetchOrderType = () => {
    this.props
      .fetchRequestIfNeeded("/Dictionary/DictGetChild", "get", {
        Code: "OrderType",
        NameSort: "Order"
      })
      .then(json => {
        if (json.value) {
          this.props.saveOrderEntrustData(json.value.Data, "OrderType");
        }
      });
  };
  // 客户联系人
  fetchCustomerContact = () => {
    this.props
      .fetchRequestIfNeeded("/api/PartnerContact/GetListNoDriver", "get", {})
      .then(json => {
        if (json.value) {
          this.props.saveOrderEntrustData(json.value.Data, "CustomerContact");
        }
      });
  };
  // 业务员
  fetchEmployee = () => {
    this.props
      .fetchRequestIfNeeded("/Employee/Search", "post", {})
      .then(json => {
        if (json.value) {
          this.props.saveOrderEntrustData(json.value.Data, "Employee");
        }
      });
  };
  // 贸易方式
  fetchTradeWay = () => {
    this.props
      .fetchRequestIfNeeded("/Dictionary/DictGetChild", "post", {
        Code: "TradeWay"
      })
      .then(json => {
        if (json.value) {
          this.props.saveOrderEntrustData(json.value.Data, "TradeWay");
        }
      });
  };

  render() {
    return (
      <div className="OrdersEntrustView-container">
        <PageHeader />
        <div className="main-content">
          <SearchForm setSearchData={this.setSearchData} />
        </div>
      </div>
    );
  }
}
export default OrdersEntrustView;
