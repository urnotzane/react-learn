import React from "react";
import PropTypes from "prop-types";
import "moment/locale/zh-cn";
import { Form, Input, Select, DatePicker } from "antd";

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const moment = require("moment");
moment.locale("zh-cn");

const SelectProps = {
  style: { width: 180 },
  defaultActiveFirstOption: false,
  showArrow: false,
  filterOption: true,
  allowClear: true,
  optionFilterProp: "children",
  notFoundContent: '暂无数据'
}
/**
 * 
 * @param {func} getFieldDecorator - 表单验证函数
 * @param {Object[]} customerOptions - 客户数据
 * @param {Object[]} DriverOptions - 司机数据
 * @param {Object[]} SupplierOptions - 车牌数据
 */
const SearchItem = ({ getFieldDecorator, customerOptions, DriverOptions, SupplierOptions }) => (
  <div className="form-not-button" style={{ display: 'inline' }}>
    <FormItem label="做柜时间">
      {getFieldDecorator("RangeDate", {
        rules: [{ required: false }]
      })(<RangePicker />)}
    </FormItem>
    <FormItem label="客户">
      {getFieldDecorator("customerId", {
        rules: [{ required: false }]
      })(
        <Select
          showSearch
          placeholder="客户简称"
          {...SelectProps}
        >
          {customerOptions}
        </Select>
      )}
    </FormItem>
    <FormItem label="车牌号">
      {getFieldDecorator("SupplierId", {
        rules: [{ required: false }]
      })(
        <Select
          showSearch
          placeholder="车牌号"
          {...SelectProps}
        >
          {SupplierOptions}
        </Select>
      )}
    </FormItem>
    <FormItem label="司机">
      {getFieldDecorator("DriverId", {
        rules: [{ required: false }]
      })(
        <Select
          showSearch
          placeholder="司机姓名"
          {...SelectProps}
        >
          {DriverOptions}
        </Select>
      )}
    </FormItem>
    <FormItem label="柜号">
      {getFieldDecorator("arkNo", {
        rules: [{ required: false }]
      })(<Input placeholder="柜号" />)}
    </FormItem>
    <FormItem label="订舱号">
      {getFieldDecorator("BookingNum", {
        rules: [{ required: false }]
      })(<Input placeholder="订舱号" />)}
    </FormItem>
    <FormItem label="订单号">
      {getFieldDecorator("orderNo", {
        rules: [{ required: false }]
      })(<Input placeholder="订单号" />)}
    </FormItem>
  </div>
);

SearchItem.prototype = {
  getFieldDecorator: PropTypes.func.isRequired,
  SupplierOptions: PropTypes.array.isRequired,
  DriverOptions: PropTypes.array.isRequired,
  customerOptions: PropTypes.array.isRequired,
};

export default SearchItem;
