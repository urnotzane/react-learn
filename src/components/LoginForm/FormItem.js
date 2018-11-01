import React from "react";
import PropTypes from "prop-types";
import { Form, Input, Icon } from 'antd'

const FormItem = Form.Item;
const FormItemCom = ({ onClick, onDelete, completed, text }) => (
  <div>
    <FormItem>
      <Input
        prefix={
          <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
        }
        placeholder="用户名"
      />
    </FormItem>
  </div>
);

FormItemCom.prototype = {
  onClick: PropTypes.func.isRequired,
  deleteFormItem: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
};

export default FormItemCom;
