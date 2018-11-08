import React from "react";
import { Form, Button } from "antd";
import SearchItem from './SearchItem'
import './index.less'

const FormItem = Form.Item;

class FormCom extends React.Component {
  state = {
  };

  componentDidMount() { 
    console.log(this)
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  /** 表单提交 */
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
      }
    });
  };

  /** 重置表单 */
  handleReset = () => {
    this.props.form.resetFields();
  };

  render() {
    return (
      <Form
        onSubmit={this.handleSubmit}
        className="search-form"
        layout="inline"
      >
        <SearchItem getFieldDecorator={this.props.form.getFieldDecorator} />
        <FormItem className="search-submit">
          <Button type="primary" htmlType="submit" >搜索</Button>
        </FormItem>
        
        <FormItem>
          <Button type="default" htmlType="reset" onClick={this.handleReset}>重置</Button>
        </FormItem>

      </Form>
    )
  }
}

const SearchForm = Form.create()(FormCom);

export default SearchForm;