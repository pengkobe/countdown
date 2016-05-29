import React, { Component, PropTypes } from 'react';
import { Spin, Button  } from 'antd';
import Countdown from './Countdown';
import AddCountdown from './AddCountdown';
import styles from './Countdowns.less';
import { getCountdowns } from '../../services/Countdowns';

class CountdownsContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // 倒计时列表
      list: [],
      loading: false,
    };
  }

  loadCountdowns() {
    this.setState({ loading: true });
    getCountdowns("").then(({ jsonResult }) => {
      this.setState({
        list: jsonResult.data,
        loading: false,
      });
    })
  }


componentDidMount() {
  // 云端加载
  this.loadCountdowns();
}

render() {
  const { location } = this.props;
  const { list, loading } = this.state;

  // location.pathname: 当前路径
  const countdowns = filter({ list, loading }, location.pathname);
  return (
    <div>
      <AddCountdown  />
      <Countdowns countdowns={countdowns} />
    </div>
  );
}
}

const Countdowns = ({ countdowns,  }) => {
  const renderList = () => {
    const { list, loading } = countdowns;
    if (loading) {
      return <Spin />;
    }

    return (
      <div className={styles.list}>
        {list.map(item => <Countdown
          key={item._id}
          data={item}
          />
        ) }
      </div>
    );
  };

  return (
    <div className={styles.normal}>
      {renderList() }
    </div>
  );
};

Countdowns.propTypes = {};

/* 过滤器，按日期/级别过滤 */
function filter(countdowns, pathname) {
  const newList = countdowns.list.filter(countdown => {
    if (pathname === '/actived') {
      return !countdown.isComplete;
    }
    if (pathname === '/completed') {
      return countdown.isComplete;
    }
    return true;
  });
  return { ...countdowns, list: newList };
}

export default CountdownsContainer;
