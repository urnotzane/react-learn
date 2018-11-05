import React from "react";
import "./index.less";
import { Form, Card } from "antd";
import LoginItem from "./LoginItem";
import LoginSubmit from "./LoginSubmit";

class LoginForm extends React.Component {

  componentDidMount() {
    console.log(this)
  }

  /**
   * @todo 表单提交
   */
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.fetchRequestIfNeeded('/Login/Login', values, 'LoginData', 'post').then(()=>{
          if(this.props.LoginData.data.State===0){
            this.props.history.push('/Home')
          }
        })
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
            <LoginSubmit loading={this.props.LoginData.isFetching} />
          </Form>
        </Card>
      </div>
    );
  }
}

const Login = Form.create()(LoginForm);

export default Login;
