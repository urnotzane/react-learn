import React from "react";
import "./index.less";
import { Layout, Breadcrumb, Modal } from "antd";
import SiderMenu from "./SiderMenu";

const { Header, Content, Footer } = Layout;

class HomePage extends React.Component {
  state = {
    collapsed: false,
    MenuList: [] //菜单
  };

  componentDidMount() {
    console.log(this);
    /**
     * 从本地存储获取菜单数据
     */
    const MenuList = localStorage.getItem("MenuList");
    if (MenuList && JSON.parse(MenuList)) {
      this.setState({
        MenuList: JSON.parse(MenuList)
      });
    } else {
      this.WarningModal("菜单数据获取失败，请重新登录！");
    }
  }

  WarningModal = content => {
    Modal.warning({
      title: "提示",
      content,
      onOk: () => {
        window.open("/", "_self");
      }
      // 全局销毁
      // modal.destroy();
    });
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <div>
        <Layout style={{ minHeight: "100vh" }}>
          <SiderMenu
            MenuList={this.state.MenuList}
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          />
          <Layout>
            <Header style={{ background: "#fff", padding: 0 }} />
            <Content style={{ margin: "0 16px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
                Bill is a cat.
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default HomePage;
