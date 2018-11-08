import React from "react";
import { Form, Button, Select } from "antd";
import SearchItem from "./SearchItem";
import "./index.less";

const FormItem = Form.Item;
const Option = Select.Option;
const moment = require("moment");
moment.locale("zh-cn");

class FormCom extends React.Component {
  componentDidMount() {
    console.log(this);
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
        if (values.RangeDate && values.RangeDate.length >= 2) {
          values.presentTimeBeginDate = moment(values.RangeDate[0]).format(
            "YYYY-MM-DD"
          );
          values.presentTimeEndDate = moment(values.RangeDate[1]).format(
            "YYYY-MM-DD"
          );
        } else {
          values.presentTimeBeginDate = "";
          values.presentTimeEndDate = "";
        }
        delete values.RangeDate;
        for (let key in values) {
          if (!values[key]) {
            values[key] = "";
          }
        }
        this.props.setSearchData(values);
      }
    });
  };

  /** 重置表单 */
  handleReset = () => {
    this.props.form.resetFields();
  };

  render() {
    const customerOptions = this.props.customer.map(d => (
      <Option key={d.Id}>{d.ShortName}</Option>
    ));
    const DriverOptions = this.props.Driver.map(d => (
      <Option key={d.Id}>{d.ContactNameAndPhone}</Option>
    ));
    const SupplierOptions = this.props.Supplier.map(d => (
      <Option key={d.Id}>{d.ShortName}</Option>
    ));
    return (
      <Form
        onSubmit={this.handleSubmit}
        className="search-form"
        layout="inline"
      >
        <SearchItem
          getFieldDecorator={this.props.form.getFieldDecorator}
          customerOptions={customerOptions}
          DriverOptions={DriverOptions}
          SupplierOptions={SupplierOptions}
        />
        <FormItem className="search-submit">
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
        </FormItem>

        <FormItem>
          <Button type="default" htmlType="reset" onClick={this.handleReset}>
            重置
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const SearchForm = Form.create()(FormCom);

export default SearchForm;
