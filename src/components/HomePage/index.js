import React from "react";
import "./index.less";
import { Layout, Modal } from "antd";
import SiderMenu from "./SiderMenu";
import HomeHeader from "./HomeHeader";

const { Content, Footer } = Layout;

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

  /**点击菜单事件 */
  handleMenuClick = e => {
    console.log(e)
  };

  render() {
    return (
      <div className='home-container'>
        <Layout style={{ minHeight: "100vh" }}>
          <SiderMenu
            MenuList={this.state.MenuList}
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
            handleMenuClick={this.handleMenuClick}
          />
          <Layout>
            <HomeHeader />
            <Content>
              {/* <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
                Bill is a cat.
              </div> */}
              {this.props.children}
            </Content>
            <Footer style={{ textAlign: "center" }}>
              UAT ©2018 Created by Zane
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default HomePage;
