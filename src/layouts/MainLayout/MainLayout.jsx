import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import { Icon } from 'antd';
import styles from './MainLayout.less';

// //路由导航
// <div className={styles.side}>
//       <Link to="/">全部</Link><br />
//       <Link to="/actived">七天</Link><br />
//       <Link to="/completed">一月</Link><br />
//       <Link to="/404">404</Link><br />
//     </div>

const MainLayout = ({ children }) => {
  return (
    <div className={styles.normal}>
      <div className={styles.head}>
        <h1 className={styles.title} icon="plus">
        <Icon type="clock-circle-o" />
        倒计时</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.main}>
          {children}
        </div>
      </div>
      <div className={styles.foot}>
        <span>Copyright ©2016 </span> |
        <a href="www.miitbeian.gov.cn" target="_blank">粤ICP备14081691号</a> |
        based on<a href="/">ant-design</a> | <a href="http://yipeng.info/about#contact">yipeng</a>
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainLayout;
