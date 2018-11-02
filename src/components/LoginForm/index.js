import React from "react";
import "./index.less";
import { Form, Card } from "antd";
import fetchRequestIfNeeded from "../../middleware/api";
import { connect } from "react-redux";
import LoginItem from "./LoginItem";
import LoginSubmit from "./LoginSubmit";
import store from "../../store/store";

const mapStateToProps = (state) => {
  return {
    ...state.fetchData.LoginData
  }
}

const mapDispatchToProps = dispatch => ({
  fetchRequestIfNeeded: (url, params, dataName) => dispatch(fetchRequestIfNeeded(url, params, dataName))
})

class LoginForm extends React.Component {
  state = { ...store.getState('fetchData').LoginData }
  componentDidMount() {
    console.log(this);
  }

  // 表单提交
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.fetchRequestIfNeeded('/Login/Login', values, 'LoginData')
        console.log(this.state)
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
