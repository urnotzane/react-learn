import React from "react";
import "./index.less";
import { Form, Card } from "antd";
import LoginItem from "./LoginItem";
import LoginSubmit from "./LoginSubmit";

class LoginForm extends React.Component {
  state = {
    loading: false
  };
  componentDidMount() {
    console.log(this);
  }

  /**
   * @todo 表单提交=>存储到公共redux=>获取导航菜单=>存储到公共redux
   */
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        this.props
          .fetchRequestIfNeeded("/Login/Login", "post", values)
          .then(json => {
            if (json.value && json.value.State === 0) {
              this.props.saveData(json.value, "LoginData");
              /**获取导航菜单 */
              this.props
                .fetchRequestIfNeeded("/Home/NavNodes", "get")
                .then(json => {
                  this.props.saveData(json.value, "MenuList");
                  this.setState({ loading: false });
                  this.props.history.push("/Home");
                });
            }
          });
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
            <LoginSubmit loading={this.state.loading} />
          </Form>
        </Card>
      </div>
    );
  }
}

const Login = Form.create()(LoginForm);

export default Login;
