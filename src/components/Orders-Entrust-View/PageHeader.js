import React from "react";
import { Layout, Breadcrumb } from "antd";

const { Header } = Layout;

const PageHeader = () => (
  <Header>
    <Breadcrumb style={{ marginBottom: '16px' }}>
      <Breadcrumb.Item href="/Home">首页</Breadcrumb.Item>
      <Breadcrumb.Item>销售管理</Breadcrumb.Item>
      <Breadcrumb.Item>拖车订单</Breadcrumb.Item>
    </Breadcrumb>
  </Header>
);

export default PageHeader;