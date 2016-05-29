import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import styles from './MainLayout.less';
// onClick={this.handleClick} selectedKeys={[this.state.current]}
//  <Menu
//         mode="horizontal">
//         <Menu.Item key="mail">
//           <Icon type="mail" />首页
//         </Menu.Item>
//         <Menu.Item key="app" >
//           <Icon type="appstore" />日历
//         </Menu.Item>
//         <SubMenu title={<span><Icon type="setting" />设置</span>}>
//           <MenuItemGroup title="分组1">
//             <Menu.Item key="setting:1">选项1</Menu.Item>
//             <Menu.Item key="setting:2">选项2</Menu.Item>
//           </MenuItemGroup>
//         </SubMenu>
//         <Menu.Item key="alipay">
//           <a href="http://yipeng.info/" target="_blank">kobepeng</a>
//         </Menu.Item>
//       </Menu>
const MainLayout = ({ children }) => {
  return (
    <div className={styles.normal}>
      <div className={styles.head}>
        <h1>倒计时</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.side}>
          <Link to="/">全部</Link><br />
          <Link to="/actived">七天</Link><br />
          <Link to="/completed">一月</Link><br />
          <Link to="/404">404</Link><br />
        </div>
        <div className={styles.main}>
          {children}
        </div>
      </div>
      <div className={styles.foot}>
        <span>Copyright ©2013-2016 </span> |
        <a href="www.miitbeian.gov.cn" target="_blank">粤ICP备14081691号</a> |
        <a href="/">kobepeng</a>手工打造 | <a href="http://yipeng.info/about#contact">联系方式</a>
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainLayout;
