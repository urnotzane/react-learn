import React from "react";
import { Form, Button } from "antd";
import { fetchPostsIfNeeded } from "../../actions";
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
        this.props.dispatch(fetchPostsIfNeeded('/Login/Login',values, 'LoginData'));
      }
    });
  };

  render() {
    const getFieldDecorator = this.props.form.getFieldDecorator;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem getFieldDecorator={getFieldDecorator} />
          <Button htmlType="submit">提交</Button>
        </Form>
      </div>
    );
  }
}

const Login = Form.create()(LoginForm);

export default connect()(Login);
