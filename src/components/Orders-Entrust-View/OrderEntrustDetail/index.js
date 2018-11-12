import React from "react";
import "./index.less";
import "moment/locale/zh-cn";
import { Form, Select, Tabs, Spin, Icon, message } from "antd";
import Base from "./base";
import Footer from "./footer";
import Loading from "./loading";
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const moment = require("moment");
moment.locale("zh-cn");

function callback(key) {
  // console.log(key);
}

class OrderEntrustDetail extends React.Component {
  state = {
    OrderDetail: {},
    OrderCostList: [],
    OrderEntrust: {
      OrderNo: "" //事先声明，避免报错
    },
    OrderFactoryList: [], //已选择的工厂
    OrderTruck: {
      OrderNo: "" //事先声明，避免报错
    },
    orderCostId: [],
    CustomerContact: [], //根据客户id搜索的客户联系人
    FactoryInHandling: [], //该客户工厂
    visible: false, //选择工厂modal的显示
    tempValue: "" //临时变量
  };

  componentDidMount() {
    this.fetchOrderInfo();
    this.fetchOrderDetail();
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  // 选择客户联动
  customerChange = value => {
    let OrderEntrust = this.state.OrderEntrust
    OrderEntrust.CustomerContactId = ''
    this.setState({
      OrderFactoryList: [],
      OrderEntrust
    })
    this.fetchCustomerContact(value)
    this.fetchFactoryInHandling(value, [])
  }

  // 客户联系人
  fetchOrderDetail = () => {
    this.props
      .fetchRequestIfNeeded("/api/OrderEntrust/GetVOrderByNo", "get", {
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
    this.props
      .fetchRequestIfNeeded("/api/OrderEntrust/GetViewOrderByOrderNo", "get", {
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
  fetchCustomerContact = partnerId => {
    this.props
      .fetchRequestIfNeeded(
        "/api/PartnerContact/GetPartnerContactByPartnerId",
        "get",
        {
          partnerId
        }
      )
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
    this.props
      .fetchRequestIfNeeded("/api/FactoryInHandling/GetList", "get", {
        partnerId
      })
      .then(json => {
        if (json.value.result) {
          OrderFactoryList.forEach((item, index) => {
            if (
              json.value.Data.find(
                item1 => item1.Id === item.FactoryInHandlingId
              )
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

  // 工厂删除
  handleDelete = index => {
    const OrderFactoryList = this.state.OrderFactoryList;
    OrderFactoryList.splice(index, 1);
    this.setState({ OrderFactoryList });
  };
  // 添加工厂;
  handleAddFactory = () => {
    if (
      this.state.FactoryInHandling.length <= this.state.OrderFactoryList.length
    ) {
      message.warning("暂无可选工厂");
      return;
    }
    this.setState({ visible: true });
  };

  // Select选中回调
  onSelected = value => {
    this.setState({ tempValue: value });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
      tempValue: "" //清空工厂选择id
    });
  };

  handleOk = e => {
    if (this.state.tempValue) {
      const FactoryInHandling = this.state.FactoryInHandling;
      const OrderFactoryList = this.state.OrderFactoryList;
      const SelectId = this.state.tempValue;
      if (OrderFactoryList.find(item => item.Id === +SelectId)) {
        message.warning("不可重复选择");
      } else {
        OrderFactoryList.push(
          FactoryInHandling.find(item => item.Id === +SelectId)
        );
        this.setState({ OrderFactoryList });
      }
    }
  };

  // 表单提交
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        for (let key in values) {
          if (values[key] && typeof values[key] === "object") {
            values[key] = moment(values[key]).format("YYYY-MM-DD");
          }
          if (!values[key]) {
            values[key] = "";
          }
        }
        console.log(values);
        this.props.handleCancel();
      } else {
        console.log(err);
      }
    });
  };

  render() {
    const getFieldDecorator = this.props.form.getFieldDecorator;
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
    const CustomerContactOptions = this.state.CustomerContact.map(d => (
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
        <Form style={{ padding: "0.5em 0" }} onSubmit={this.handleSubmit}>
          <Tabs defaultActiveKey="1" onChange={callback} style={{ margin: 0 }}>
            <TabPane tab="基础信息" key="1" forceRender={true}>
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
                customerChange={this.customerChange}
              />
            </TabPane>
            <TabPane tab="装货信息" key="2" forceRender={true}>
              <Loading
                getFieldDecorator={getFieldDecorator}
                customerOptions={customerOptions}
                PortOptions={PortOptions}
                CustomsDeclarationOptions={CustomsDeclarationOptions}
                TradeWayOptions={TradeWayOptions}
                FactoriesOptions={FactoriesOptions}
                OrderEntrust={this.state.OrderEntrust}
                OrderTruck={this.state.OrderTruck}
                OrderDetail={this.state.OrderDetail}
                handleDelete={this.handleDelete}
                handleAddFactory={this.handleAddFactory}
                onSelected={this.onSelected}
                handleOk={this.handleOk}
                handleCancel={this.handleCancel}
                OrderFactoryList={this.state.OrderFactoryList}
                visible={this.state.visible}
              />
            </TabPane>
            <TabPane tab="操作信息" key="3" forceRender={true}>操作信息</TabPane>
            <TabPane tab="调度信息" key="4" forceRender={true}>调度信息</TabPane>
            <TabPane tab="费用信息" key="5" forceRender={true}>费用信息</TabPane>
          </Tabs>
          <Footer />
        </Form>
      </Spin>
    );
  }
}

const OrderEntrustDetailForm = Form.create()(OrderEntrustDetail);

export default OrderEntrustDetailForm;
