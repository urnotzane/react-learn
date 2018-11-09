import React from "react";
import "./index.less";
import {
  Table,
  Icon,
  Button,
  Spin,
  Dropdown,
  Menu,
  Tag,
  Card
} from "antd";

/**锁定状态 */
const LockState = [{
  color: '#87d068',
  value: '未锁定'
}, {
  color: '#f50',
  value: '已锁定'
}]

/**下拉菜单点击 */
function handleMenuClick(e) {
  console.log('click', e);
}

/**订单属性 */
const OrderProps = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
)

/**订单分组 */
const OrderGroup = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
)

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: record => ({
    name: record.name
  })
};

class OrderEntrustList extends React.Component {
  componentDidMount() {
    console.log(this)
  }

  render() {
    const columns = [{
      title: "序号",
      dataIndex: "ListIndex",
    }, {
      title: "订单号",
      dataIndex: "OrderNo",
      className: 'column-light',
      render: (text, record) => (
        <span>
          <span onClick={() => this.handleShowDetail(text)} title="查看订单详情">{text} </span>
          <Tag color={LockState[record.IsLock].color}>{LockState[record.IsLock].value}</Tag>
        </span>
      )
    }, {
      title: "订单状态",
      dataIndex: "OrderStatusName"
    }, {
      title: "做柜时间",
      dataIndex: "FormatPresentTime"
    }, {
      title: "司机",
      dataIndex: "DriverName"
    }, {
      title: "车牌",
      dataIndex: "PlateAndType"
    }, {
      title: "客户简称",
      dataIndex: "CustomerName"
    }, {
      title: "柜号",
      dataIndex: "TankNo"
    }, {
      title: "订舱号",
      dataIndex: "BookingNum"
    }, {
      title: "订单属性",
      dataIndex: "TruckTypeName"
    }, {
      title: "订单分组",
      dataIndex: "DispatchGroupName"
    }, {
      title: "订单类型",
      dataIndex: "OrderTypeName"
    }, /*{
      title: "运价",
      dataIndex: "Freight",
      className: "column-money"
    }*/];
    return (
      <Spin indicator={<Icon style={{ fontSize: '3em' }} type="loading" theme="outlined" />} spinning={this.props.loading}>
        <Card className="OrderEntrustList">
          <div className="action-btn">
            <Button type="primary"><Icon type="plus" theme="outlined" />添加拖车订单</Button>
            <Button><Icon type="edit" theme="outlined" />修改订单</Button>
            <Button type="danger"><Icon type="delete" theme="outlined" />删除订单</Button>
            <Button>订单改派</Button>
            <Button>订单外派</Button>
            <Button><Icon type="printer" theme="outlined" />订单打印</Button>
            <Button><Icon type="export" theme="outlined" />订单导出</Button>
            <Button>批量派单</Button>
            <Button><Icon type="lock" theme="outlined" />批量锁单</Button>
            <Button>批量发布</Button>
            <Button>我的调度</Button>
            <Dropdown overlay={OrderProps}>
              <Button>
                订单属性 <Icon type="down" />
              </Button>
            </Dropdown>
            <Dropdown overlay={OrderGroup}>
              <Button>
                订单分组 <Icon type="down" />
              </Button>
            </Dropdown>
          </div>
          <Table
            className="table-container"
            pagination={{
              pageSize: this.props.PageSize,
              total: this.props.total,
              showQuickJumper: true,
              showTotal: total => `共 ${total} 条数据`,
              showSizeChanger: true,
              onShowSizeChange: this.props.onShowSizeChange,
              onChange: this.props.onChange,
              bordered: true
            }}
            rowKey={(item, index) => index}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.props.OrderList}
            bordered={true}
          />
        </Card>
      </Spin>
    );
  }
}

export default OrderEntrustList