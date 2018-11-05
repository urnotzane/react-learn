import React from "react";
import { Form, Button } from "antd";

const FormItem = Form.Item;
const LoginSubmit = ({loading}) => (
  <div>
    <FormItem>
      <Button
        type="primary"
        htmlType="submit"
        className="login-form-button"
        loading={loading}
      >
        登录
      </Button>
    </FormItem>
  </div>
);

export default LoginSubmit;
