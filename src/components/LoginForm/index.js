import React from "react";
import { Form, Button } from "antd";
import { fetchRequestIfNeeded } from "../../actions";
import { connect } from "react-redux";
import FormItem from "./FormItem";

class LoginForm extends React.Component {
  componentDidMount() {
    console.log(this);
  }

  // 表单提交
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(fetchRequestIfNeeded('/Login/Login',values, 'LoginData'));
      }
    });
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem getFieldDecorator={this.props.form.getFieldDecorator} />
          <Button htmlType="submit">提交</Button>
        </Form>
      </div>
    );
  }
}

const Login = Form.create()(LoginForm);

export default connect()(Login);
