import React from 'react'
import "./index.less";
import "moment/locale/zh-cn";
import {
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  Tabs,
  Spin,
  Icon,
  Divider,
  Table,
  Modal,
  message
} from "antd";
import Base from './base'
const TabPane = Tabs.TabPane;
const { TextArea } = Input;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const moment = require("moment");
moment.locale("zh-cn");

function callback(key) {
  console.log(key);
}

class OrderEntrustDetail extends React.Component {
  state = {
    OrderDetail: {},
    OrderCostList: [],
    OrderEntrust: {
      OrderNo: '',//事先声明，避免报错
    },
    OrderFactoryList: [], //已选择的工厂
    OrderTruck: {
      OrderNo: '',//事先声明，避免报错
    },
    orderCostId: [],
    CustomerContact: [], //根据客户id搜索的客户联系人
    FactoryInHandling: [], //该客户工厂
    visible: false, //选择工厂显示
    tempValue: "" //临时变量
  };

  componentDidMount() {
    console.log(this);
    this.fetchOrderInfo();
    this.fetchOrderDetail();
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  // 客户联系人
  fetchOrderDetail = () => {
    this.props.fetchRequestIfNeeded("/api/OrderEntrust/GetVOrderByNo", 'get', {
      orderNo: this.props.orderNo
    })
      .then(json => {
        if (json.value.result) {
          this.setState({
            OrderDetail: json.value.Data
          });
        }
      });
  };
  //订单信息
  fetchOrderInfo = () => {
    this.setState({ loading: true });
    this.props.fetchRequestIfNeeded("/api/OrderEntrust/GetViewOrderByOrderNo", 'get', {
      orderNo: this.props.orderNo
    })
      .then(json => {
        this.setState({ loading: false });
        if (json.value.result) {
          const OrderCostList = json.value.Data.OrderCostList,
            OrderEntrust = json.value.Data.OrderEntrust,
            OrderFactoryList = json.value.Data.OrderFactoryList,
            OrderTruck = json.value.Data.OrderTruck,
            orderCostId = json.value.Data.orderCostId;
          this.setState({
            OrderCostList,
            OrderEntrust,
            OrderFactoryList,
            OrderTruck,
            orderCostId
          });
          this.fetchCustomerContact(OrderEntrust.CustomerId);
          this.fetchFactoryInHandling(
            OrderEntrust.CustomerId,
            OrderFactoryList
          );
          this.props.form.setFieldsValue({
            BusinessType: OrderEntrust.BusinessType
              ? OrderEntrust.BusinessType.toString()
              : "",
            SalesmanId: OrderEntrust.SalesmanId
              ? OrderEntrust.SalesmanId.toString()
              : "",
            OrderType: OrderTruck.OrderType
              ? OrderTruck.OrderType.toString()
              : "",
            OperatorId: OrderEntrust.OperatorId
              ? OrderEntrust.OperatorId.toString()
              : "",
            PaymentMothod: OrderTruck.PaymentMothod
              ? OrderTruck.PaymentMothod.toString()
              : "",
            CustomerId: OrderEntrust.CustomerId
              ? OrderEntrust.CustomerId.toString()
              : "",
            CustomerContactId: OrderEntrust.CustomerContactId
              ? OrderEntrust.CustomerContactId.toString()
              : "",
            CustomsAgencyId: OrderTruck.CustomsAgencyId
              ? OrderTruck.CustomsAgencyId.toString()
              : "",
            CustomsDataId: OrderTruck.CustomsDataId
              ? OrderTruck.CustomsDataId.toString()
              : "",
            CustomsClearanceWayId: OrderTruck.CustomsClearanceWayId
              ? OrderTruck.CustomsClearanceWayId.toString()
              : "",
            TradeWayId: OrderTruck.TradeWayId
              ? OrderTruck.TradeWayId.toString()
              : ""
          });
        }
      });
  };
  // 客户联系人
  fetchCustomerContact = (partnerId, OrderFactoryList) => {
    this.props.fetchRequestIfNeeded("/api/PartnerContact/GetPartnerContactByPartnerId", 'get', {
      partnerId
    })
      .then(json => {
        if (json.value.result) {
          this.setState({
            CustomerContact: json.value.Data
          });
        }
      });
  };
  // 客户工厂
  fetchFactoryInHandling = (partnerId, OrderFactoryList) => {
    this.props.fetchRequestIfNeeded("/api/FactoryInHandling/GetList", 'get', {
      partnerId
    })
      .then(json => {
        if (json.value.result) {
          OrderFactoryList.forEach((item, index) => {
            if (
              json.value.Data.find(item1 => item1.Id === item.FactoryInHandlingId)
            ) {
              OrderFactoryList[index] = json.value.Data.find(
                item1 => item1.Id === item.FactoryInHandlingId
              );
            }
          });
          this.setState({
            FactoryInHandling: json.value.Data,
            OrderFactoryList
          });
        }
      });
  };


  render() {
    const getFieldDecorator  = this.props.form.getFieldDecorator
    const customerOptions = this.props.customer.map(d => (
      <Option key={d.Id}>{d.ShortName}</Option>
    ));
    const DriverOptions = this.props.Driver.map(d => (
      <Option key={d.Id}>{d.ContactNameAndPhone}</Option>
    ));
    const SupplierOptions = this.props.Supplier.map(d => (
      <Option key={d.Id}>{d.ShortName}</Option>
    ));
    const BusinessTypeOptions = this.props.BusinessType.map(d => (
      <Option key={d.Id}>{d.Value}</Option>
    ));
    const OrderTypeOptions = this.props.OrderType.map(d => (
      <Option key={d.ExtendNumber1}>{d.Value}</Option>
    ));
    const EmployeeOptions = this.props.Employee.map(d => (
      <Option key={d.Id}>{d.ChinaName}</Option>
    ));
    const PaymentMethodOptions = this.props.PaymentMethod.map(d => (
      <Option key={d.ExtendNumber1}>{d.Value}</Option>
    ));
    const CustomerContactOptions = this.props.CustomerContact.map(d => (
      <Option key={d.Id}>{d.ContactName}</Option>
    ));
    const PortOptions = this.props.Port.map(d => (
      <Option key={d.PortId}>{d.PortName}</Option>
    ));
    const CustomsDeclarationOptions = this.props.CustomsDeclaration.map(d => (
      <Option key={d.Id}>{d.Value}</Option>
    ));
    const TradeWayOptions = this.props.TradeWay.map(d => (
      <Option key={d.Id}>{d.Value}</Option>
    ));
    const FactoriesOptions = this.state.FactoryInHandling.map(d => (
      <Option key={d.Id}>{d.FactoryOr}</Option>
    ));
    return (
      <Spin
        className="container"
        indicator={
          <Icon style={{ fontSize: "3em" }} type="loading" theme="outlined" />
        }
        spinning={this.state.loading}
      >
        <Form style={{ padding: "0.5em 0" }}>
          <Tabs defaultActiveKey="1" onChange={callback} style={{ margin: 0 }}>
            <TabPane tab="基础信息" key="1">
              <Base
                getFieldDecorator={getFieldDecorator}
                BusinessTypeOptions={BusinessTypeOptions}
                EmployeeOptions={EmployeeOptions}
                OrderTypeOptions={OrderTypeOptions}
                PaymentMethodOptions={PaymentMethodOptions}
                customerOptions={customerOptions}
                CustomerContactOptions={CustomerContactOptions}
                OrderEntrust={this.state.OrderEntrust}
                OrderTruck={this.state.OrderTruck}
              />
            </TabPane>

          </Tabs>
        </Form>
      </Spin>
    )
  }
}

const OrderEntrustDetailForm = Form.create()(OrderEntrustDetail);

export default OrderEntrustDetailForm