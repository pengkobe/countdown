import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import styles from './MainLayout.less';

const MainLayout = ({ children }) => {
  return (
    <div className={styles.normal}>
      <div className={styles.head}>
        <h1>倒计时</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.side}>
          <h2>过滤器:</h2>
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
        Built with react, react-router, ant-tool, css-modules, antd...
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainLayout;
