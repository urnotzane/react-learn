import React from "react";
import "./index.less";
import { Form, Card } from "antd";
import fetchRequestIfNeeded from "../../middleware/api";
import { connect } from "react-redux";
import LoginItem from "./LoginItem";
import LoginSubmit from "./LoginSubmit";

class LoginForm extends React.Component {
  componentDidMount() {
    console.log(this);
  }

  // 表单提交
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(fetchRequestIfNeeded('/Login/Login', values, 'LoginData'));
      }
    });
  };

  render() {
    return (
      <div className="login-view">
        <Card
          title="用户登录"
          className="login-card"
          headStyle={{ fontWeight: "bold", color: "#1890ff" }}
          hoverable={true}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <LoginItem getFieldDecorator={this.props.form.getFieldDecorator} />
            <LoginSubmit />
          </Form>
        </Card>
      </div>
    );
  }
}

const Login = Form.create()(LoginForm);

export default connect()(Login);
