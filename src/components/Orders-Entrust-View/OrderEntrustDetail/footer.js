import React from "react";
import { Form, Button } from "antd";

const FormItem = Form.Item;
const Footer = ({ loading }) => (
  <div className="modal-footer">
    <FormItem>
      <Button type="primary" htmlType="submit" loading={loading}>
        保存
      </Button>
    </FormItem>
  </div>
);

export default Footer;
