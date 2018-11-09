import React from "react";
import "./index.less";
import { Layout, Modal, Icon, BackTop } from "antd";
import SiderMenu from "./SiderMenu";
import HomeHeader from "./HomeHeader";

const { Content, Footer } = Layout;
const moment = require("moment");
moment.locale("zh-cn");

class HomePage extends React.Component {
  state = {
    collapsed: false,
    MenuList: [] //菜单
  };

  componentDidMount() {
    console.log(this);
    this.checkLogin()
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

  /**检查登录状态 */
  checkLogin = () => {
    this.props.fetchRequestIfNeeded('/Login/GetLogin', 'post', {})
      .then(json => {
        if(json.value.result){
          this.props.saveData(json.value, 'LoginData')
        }else{
          this.WarningModal('登录失效，请重新登录！')
        }
      })
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  /**点击菜单事件 */
  handleMenuClick = e => {
    console.log(e)
  };

  /**链接 */
  handleLink = e => {
    const href = e.currentTarget.dataset.href
    window.open(href)
  }

  render() {
    return (
      <div className='home-container'>
        <BackTop />
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
              {this.props.children}
            </Content>
            <Footer style={{ textAlign: "center", color: '#8e8e8e' }}>
              UAT ©{moment().format('YYYY')}
              <span title="github" onClick={this.handleLink} data-href="https://github.com/urnotzane" className="link-style"><Icon type="github" /></span>
              By Zane
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default HomePage;
