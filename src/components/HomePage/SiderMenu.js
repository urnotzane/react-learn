import React from "react";
import PropTypes from "prop-types";
import { Layout, Menu, Icon } from "antd";

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

/**
 * @module 右侧菜单的组件
 * @param {array} MenuList 菜单数组
 * @param {bool} collapsed 向右展开
 * @param {function} onCollapse 是否展开的函数
 */
const SiderMenu = ({ MenuList, collapsed, onCollapse }) => (
  <Sider
    collapsible
    collapsed={collapsed}
    onCollapse={onCollapse}
    className="sider-menu">
    <div className="logo" />
    <Menu theme="dark" mode="inline">
      {MenuList.map((item, index) => (
        <SubMenu
          key={"menu_" + index}
          title={
            <span>
              <Icon type="user" />
              <span>{item.title}</span>
            </span>
          }
        >
          {item.children.map(menu => (
            <Menu.Item key={menu.baseCode}>{menu.title}</Menu.Item>
          ))}
        </SubMenu>
      ))}
    </Menu>
  </Sider>
);

SiderMenu.prototype = {
  MenuList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      children: PropTypes.arrayOf({
        title: PropTypes.string.isRequired,
        baseCode: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  ).isRequired,
  collapsed: PropTypes.bool.isRequired,
  onCollapse: PropTypes.func.isRequired
};

export default SiderMenu;
