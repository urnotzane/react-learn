import React from "react";
import PropTypes from "prop-types";
import { Form, Input, Icon } from "antd";

const FormItem = Form.Item;
const FormItemCom = ({ getFieldDecorator }) => (
  <div>
    <FormItem>
      {getFieldDecorator("LoginName", {
        rules: [{ required: true, message: "请输入用户名!" }]
      })(
        <Input
          prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="用户名"
        />
      )}
    </FormItem>
    <FormItem>
      {getFieldDecorator("Password", {
        rules: [{ required: true, message: "请输入密码!" }]
      })(
        <Input
          prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          placeholder="密码"
        />
      )}
    </FormItem>
  </div>
);

FormItemCom.prototype = {
  getFieldDecorator: PropTypes.func.isRequired
};

export default FormItemCom;
