import React from "react";
import "moment/locale/zh-cn";
import {
  Form,
  Input,
  Select,
  DatePicker,
} from "antd";
const { TextArea } = Input;
const FormItem = Form.Item;
const moment = require("moment");
moment.locale("zh-cn");

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
const SelectProps = {
  showSearch: true,
  defaultActiveFirstOption: false,
  showArrow: false,
  filterOption: true,
  allowClear: true,
  optionFilterProp: "children",
  notFoundContent: "暂无数据"
};

// 日期校验规则
const dateValidRules = (rule, value, callback) => {
  if (!value || typeof value !== "object") {
    callback("必填项");
  } else {
    callback();
  }
};

const Base = ({
  getFieldDecorator,
  BusinessTypeOptions,
  EmployeeOptions,
  OrderTypeOptions,
  PaymentMethodOptions,
  customerOptions,
  CustomerContactOptions,
  OrderEntrust,
  OrderTruck
}) => (
    <div>
      <FormItem label="订单号" className="form-item" {...formLayout}>
        {getFieldDecorator("OrderNo", {
          rules: [{ required: false }],
          initialValue: OrderTruck.OrderNo
            ? OrderTruck.OrderNo
            : ""
        })(<Input disabled={true} placeholder="订单号" />)}
      </FormItem>
      <FormItem
        label="订单类型"
        className="form-item"
        {...formLayout}
      >
        {getFieldDecorator("BusinessType", {
          rules: [{ required: true, message: "必填项" }]
        })(
          <Select
            {...SelectProps}
            placeholder="订单类型"
            disabled={true}
          >
            {BusinessTypeOptions}
          </Select>
        )}
      </FormItem>
      <FormItem label="业务员" className="form-item" {...formLayout}>
        {getFieldDecorator("SalesmanId", {
          rules: [{ required: true, message: "必填项" }]
        })(
          <Select
            {...SelectProps}
            placeholder="业务员"
            disabled={true}
          >
            {EmployeeOptions}
          </Select>
        )}
      </FormItem>
      <FormItem label="操作员" className="form-item" {...formLayout}>
        {getFieldDecorator("OperatorId", {
          rules: [{ required: true, message: "必填项" }]
        })(
          <Select
            {...SelectProps}
            placeholder="操作员"
            disabled={true}
          >
            {EmployeeOptions}
          </Select>
        )}
      </FormItem>
      <FormItem
        label="运单类别"
        className="form-item"
        {...formLayout}
      >
        {getFieldDecorator("OrderType", {
          rules: [{ required: true, message: "必填项" }]
        })(
          <Select
            {...SelectProps}
            placeholder="运单类别"
            disabled={true}
          >
            {OrderTypeOptions}
          </Select>
        )}
      </FormItem>
      <FormItem
        label="订单日期"
        className="form-item"
        {...formLayout}
      >
        {getFieldDecorator("OrderDate", {
          rules: [
            { required: false },
            { validator: dateValidRules }
          ],
          initialValue: moment(
            OrderEntrust.OrderDate,
            "YYYY-MM-DD"
          )
        })(<DatePicker />)}
      </FormItem>
      <FormItem
        label="付款方式"
        className="form-item"
        {...formLayout}
      >
        {getFieldDecorator("PaymentMothod", {
          rules: [{ required: false }]
        })(
          <Select {...SelectProps} placeholder="付款方式">
            {PaymentMethodOptions}
          </Select>
        )}
      </FormItem>
      <FormItem
        label="客户名称"
        className="form-item"
        {...formLayout}
      >
        {getFieldDecorator("CustomerId", {
          rules: [{ required: true, message: "必填项" }]
        })(
          <Select {...SelectProps} placeholder="客户名称">
            {customerOptions}
          </Select>
        )}
      </FormItem>
      <FormItem
        label="客户下单员"
        className="form-item"
        {...formLayout}
      >
        {getFieldDecorator("CustomerContactId", {
          rules: [{ required: false }]
        })(
          <Select {...SelectProps} placeholder="客户下单员">
            {CustomerContactOptions}
          </Select>
        )}
      </FormItem>
      <FormItem label="客户PO" className="form-item" {...formLayout}>
        {getFieldDecorator("CustomerPoNo", {
          rules: [{ required: false }],
          initialValue: OrderEntrust.CustomerPoNo
            ? OrderEntrust.CustomerPoNo
            : ""
        })(<Input placeholder="客户PO" />)}
      </FormItem>
      <FormItem
        label="客户发票号"
        className="form-item"
        {...formLayout}
      >
        {getFieldDecorator("CustomerInvoice", {
          rules: [{ required: false }],
          initialValue: OrderEntrust.CustomerInvoice
            ? OrderEntrust.CustomerInvoice
            : ""
        })(<Input placeholder="客户发票号" />)}
      </FormItem>
      <FormItem label="运价" className="form-item" {...formLayout}>
        {getFieldDecorator("Freight", {
          rules: [{ required: false }],
          initialValue: OrderTruck.Freight
            ? OrderTruck.Freight
            : ""
        })(<Input placeholder="运价" />)}
      </FormItem>
      <FormItem label="备注" >
        {getFieldDecorator("Remark", {
          rules: [{ required: false }],
          initialValue: OrderEntrust.Remark
            ? OrderEntrust.Remark
            : ""
        })(<TextArea rows={3} placeholder="备注" style={{ width: "100%" }} />)}
      </FormItem>
    </div>

  )

export default Base